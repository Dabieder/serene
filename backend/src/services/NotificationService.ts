import webpush from "web-push";
import {
  NotificationType,
  Notification,
  NotificationModel
} from "../models/Notification";
import {
  PushNotificationSubscription,
  PushNotificationSubscriptionModel
} from "../models/PushNotificationSubscription";
import logger from "../util/logger";
import * as nodeCron from "node-cron";
import { ScheduledTask } from "node-cron";
import {
  getLearningPlansFlattened,
  LearningPlan
} from "../models/SrlWidget/LearningPlan";
import { PushSubscriptionService } from "./PushSubscriptionService";

export class NotificationService {
  vapidPublic = process.env["VAPID_PUBLIC"];
  vapidPrivate = process.env["VAPID_PRIVATE"];

  schedules: ScheduledTask[] = [];

  constructor(private pushSubscriptionService: PushSubscriptionService) {}

  initialize() {
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
    const subscription = await this.pushSubscriptionService.getSubscriptionForAccount(
      accountName
    );

    if (subscription) {
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
    } else {
      logger.warn(`No notification subscription found for the account`);
      return null;
    }
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

  sendNotificationsToSubscriptions = async (
    notification: NotificationModel,
    pushSubscription: PushNotificationSubscriptionModel
  ) => {
    for (const subscription of pushSubscription.subscriptions) {
      const planUrl = `/plan/${notification.planId}`;
      const message = `Have you finished your plan ${
        notification.planId
      }? Remember to monitor your progress when you are done`;
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
}
