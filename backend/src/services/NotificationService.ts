import webpush from "web-push";
import {
  NotificationType,
  Notification,
  NotificationModel
} from "../models/Notification";
import logger from "../util/logger";
import { ScheduledTask } from "node-cron";
import {
  getLearningPlansFlattened,
  LearningPlan
} from "../models/SRL/LearningPlan";
import { PushSubscriptionService } from "./PushSubscriptionService";
import { User } from "../models/User";
import { createTransport, createTestAccount, Transporter } from "nodemailer";
import moment = require("moment");
import { LANGUAGE } from "../util/constants";
import { MESSAGES } from "../data/Messages";
import { LogService } from "./LogService";

export class NotificationService {
  notificationInterval = +process.env["NOTIFICATION_CHECK_INTERVAL"]
    ? +process.env["NOTIFICATION_CHECK_INTERVAL"]
    : 60000;

  transporter: Transporter;
  schedules: ScheduledTask[] = [];

  constructor(
    private pushSubscriptionService: PushSubscriptionService,
    private logService: LogService
  ) {
    // this.initialize();
  }

  async initialie() {
    await this.configureMailer();
    this.configureWebPush();
    // await this.sendAllRegisteredNotifications();
  }

  async configureMailer() {
    this.transporter = createTransport({
      host: process.env["REMINDER_SMTP_HOST"],
      port: 587,
      secure: false,
      auth: {
        user: process.env["REMINDER_SMTP_USER"],
        pass: process.env["REMINDER_SMTP_PASS"]
      }
    });
  }

  configureWebPush() {
    const vapidPublic = process.env["VAPID_PUBLIC"];
    const vapidPrivate = process.env["VAPID_PRIVATE"];
    const vapidMailTo = process.env["VAPID_MAILTO"];
    webpush.setVapidDetails(vapidMailTo, vapidPublic, vapidPrivate);
    webpush.setVapidDetails(vapidMailTo, vapidPublic, vapidPrivate);
  }

  async sendAllNotificationsToListOfAccounts(accountNames: string[]) {
    const notifications = await Notification.find({
      accountName: {
        $in: accountNames
      }
    })
      .exec()
      .catch(e => {
        logger.error(`Error trying to retrieve all subscriptions ${e}`);
      });

    if (!notifications) {
      return false;
    }

    let notificationsSent = 0;
    try {
      for (const notification of notifications) {
        // Check for each subscription if a message is due
        // Currently because we do not have a lot of data, we can just iterate
        // over all plans. In the future, they should be stored in something like
        // "notifications due"
        const isBefore = moment(notification.dueDate).isBefore(
          new Date(Date.now())
        );

        if (isBefore) {
          await this.sendNotificationBasedOnPreference(notification);
          // TODO: Delete notification after it has been sent
          logger.debug("Deleting sent reminder");
          await notification.remove();
          this.logService.addServerLog({
            type: "notification",
            data: {
              target: notification.accountName,
              planId: notification.planId
            }
          });
          notificationsSent++;
        }
      }
      if (notificationsSent > 0) {
        logger.debug(`sent out ${notificationsSent} notifications`);
      }
    } catch (error) {
      logger.error("Error when trying to send all notifications: ", error);
    }
  }

  async sendAllRegisteredNotifications() {
    const notifications = await Notification.find()
      .exec()
      .catch(e => {
        logger.error(`Error trying to retrieve all subscriptions ${e}`);
      });

    if (!notifications) {
      return false;
    }

    try {
      for (const notification of notifications) {
        // Check for each subscription if a message is due
        // Currently because we do not have a lot of data, we can just iterate
        // over all plans. In the future, they should be stored in something like
        // "notifications due"
        const isBefore = moment(notification.dueDate).isBefore(
          new Date(Date.now())
        );

        if (isBefore) {
          await this.sendNotificationBasedOnPreference(notification);
          this.logService.addServerLog({
            type: "notification",
            data: {
              target: notification.accountName,
              planId: notification.planId
            }
          });
          await notification.remove();
        }
      }
    } catch (error) {
      logger.error("Error when trying to send all notifications: ", error);
    }
  }

  addPlanReminder = async (accountName: string, plan: any) => {
    const reminder = new Notification({
      accountName,
      type: NotificationType.LearningPlan,
      dueDate: plan.endDate,
      planId: plan.id
    });
    const newReminder = await reminder.save().catch(error => {
      logger.error("Error trying to save subscription reminder", error);
    });
    return newReminder;
  };

  handlePlanReminder = async (plan: LearningPlan, accountName: string) => {
    if (plan.remind) {
      await this.updateOrCreatePlanReminder(accountName, plan);
    } else {
      await this.deleteRemindersForPlan(plan);
    }
  };

  getRemindersForPlan = async (plan: LearningPlan) => {
    const existing = await Notification.findOne({
      planId: plan.id
    })
      .exec()
      .catch(error => {
        logger.error(
          `Error trying to retrieve subscription for learning plan`,
          error
        );
      });

    return existing;
  };

  deleteRemindersForPlan = async (learningPlan: LearningPlan) => {
    const flattened = getLearningPlansFlattened([learningPlan]);

    for (const plan of flattened) {
      const existing = await this.getRemindersForPlan(plan);

      if (existing) {
        await existing.remove().catch(error => {
          logger.error(`Error trying to delete existing learning plan`, error);
        });
      }
    }
  };

  updateOrCreatePlanReminder = async (
    accountName: string,
    learningPlan: LearningPlan
  ) => {
    const flattened = getLearningPlansFlattened([learningPlan]);

    for (const plan of flattened) {
      try {
        const existing = await Notification.findOne({
          planId: plan.id
        }).exec();

        if (existing) {
          existing.dueDate = plan.endDate;
          await existing.save();
        } else {
          const newReminder = await this.addPlanReminder(accountName, plan);
          return newReminder;
        }

        return existing;
      } catch (error) {
        logger.error(`Error trying to update plan reminder`, error);
        return null;
      }
    }
  };

  async sendNotificationBasedOnPreference(notification: NotificationModel) {
    const user = await User.findOne({
      accountName: notification.accountName
    }).exec();

    if (user.settings.usePushNotifications) {
      await this.sendPushNotificationsToSubscriptions(notification);
    }
    if (user.settings.useEMailNotifications) {
      await this.sendEMailNotification(notification, user.settings.email);
    }
  }

  sendPushNotificationsToSubscriptions = async (
    notification: NotificationModel
  ) => {
    const pushSubscription = await this.pushSubscriptionService.getSubscriptionForAccount(
      notification.accountName
    );

    if (!pushSubscription) return false;

    for (const subscription of pushSubscription.subscriptions) {
      const planUrl = `/plan/${notification.planId}`;
      const body = MESSAGES.PUSH_NOTIFICATION_BODY[LANGUAGE]; // this.getPushNotificationBody();
      const title = MESSAGES.PUSH_NOTIFICAITON_TITLE[LANGUAGE];
      const notificationPayload = {
        notification: {
          icon: "/assets/icons/serene_icon.png",
          title,
          body,
          requireInteraction: true,
          vibrate: [100, 100, 200],
          data: {
            accountName: notification.accountName,
            dateOfArrival: Date.now(),
            primaryKey: 1,
            urls: {
              monitor: "/monitor",
              plan: planUrl
            }
          },
          actions: [
            {
              action: "monitor",
              title: "Monitor"
            },
            {
              action: "plan",
              title: "Edit Plan"
            }
          ]
        }
      };

      await webpush
        .sendNotification(subscription, JSON.stringify(notificationPayload))
        .catch(e => {
          logger.error(`Could not send web push message due to error: `, e);
        });
    }
  };

  async sendEMailNotification(notification: NotificationModel, email: string) {
    try {
      const subject = MESSAGES.MAIL_SUBJECT[LANGUAGE];
      const text = MESSAGES.MAIL_BODY_TEXT[LANGUAGE];
      const html = `Have you reached your learning goals? <a href=${
        process.env["MONITORING_URL"]
      }> Click here to monitor your progress</a>`;
      const info = await this.transporter.sendMail({
        from: `"Serene Application" <serene@edutec.guru`,
        to: email,
        subject,
        text
      });
      logger.debug(`Sent reminder mail to: `, info);
    } catch (error) {
      logger.error(`Could not send email reminder: `, error);
    }
  }

  async sendTextNotification(
    notification: NotificationModel,
    phoneNumber: string
  ) {
    logger.error(
      "Trying to send text notifications, but it is not yet implemented"
    );
    throw new Error("Not Implemented");
  }
}
