import webpush from "web-push";
import {
  NotificationType,
  Notification,
  NotificationModel
} from "../models/Notification";
import logger from "../util/logger";
import * as nodeCron from "node-cron";
import { ScheduledTask } from "node-cron";
import {
  getLearningPlansFlattened,
  LearningPlan
} from "../models/SrlWidget/LearningPlan";
import { PushSubscriptionService } from "./PushSubscriptionService";
import { User } from "../models/User";
import { createTransport, createTestAccount, Transporter } from "nodemailer";

export class NotificationService {
  vapidPublic = process.env["VAPID_PUBLIC"];
  vapidPrivate = process.env["VAPID_PRIVATE"];

  transporter: Transporter;
  schedules: ScheduledTask[] = [];

  constructor(private pushSubscriptionService: PushSubscriptionService) {
    // this.initialize();
    this.configureMailer();
    this.configureWebPush();
  }

  async configureMailer() {
    const testAccount = await createTestAccount();
    this.transporter = createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });
  }

  configureWebPush() {
    webpush.setVapidDetails(
      "mailto:biedermann@dipf.de",
      this.vapidPublic,
      this.vapidPrivate
    );
  }

  getPlanReminderNotification() {
    const notificationPayload = {
      notification: {
        title: "serene test notification",
        body: "notification body",
        icon: "../assets/icons/serene_icon.png"
      }
    };
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
      await this.deletePlanReminder(plan);
    }
  };

  getPlanReminder = async (plan: LearningPlan) => {
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

  deletePlanReminder = async (learningPlan: LearningPlan) => {
    const flattened = getLearningPlansFlattened([learningPlan]);

    for (const plan of flattened) {
      const existing = await this.getPlanReminder(plan);

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
      await this.sendNotificationsToSubscriptions(notification);
    }
    if (user.settings.useEMailNotifications) {
      await this.sendEMailNotification(notification, user.settings.email);
    }
  }

  sendNotificationsToSubscriptions = async (
    notification: NotificationModel
  ) => {
    const pushSubscription = await this.pushSubscriptionService.getSubscriptionForAccount(
      notification.accountName
    );

    for (const subscription of pushSubscription.subscriptions) {
      const planUrl = `/plan/${notification.planId}`;
      const message = `Hast du deine Lernziel erreicht? Denk daran, deine Beobachtung durchzuführen`;
      const title = `Serene reminder`;
      const notificationPayload = {
        notification: {
          icon: "/assets/icons/serene_icon.png",
          title: title,
          body: message,
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
    logger.error(
      "Trying to send email notifications, but it is not yet implemented"
    );
    const info = await this.transporter.sendMail({
      from: `"Serene Application" <serene@edutec.guru`,
      to: email,
      subject: "Remember to Monitor your Learning",
      text: "serene.edutec.guru"
    });
    logger.info(`Sent reminder mail: `, info);
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
