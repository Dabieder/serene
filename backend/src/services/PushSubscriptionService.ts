import {
  PushNotificationSubscription,
  PushNotificationSubscriptionModel
} from "../models/PushNotificationSubscription";
import logger from "../util/logger";
import { PushSubscription } from "web-push";
import { NotificationModel, Notification } from "../models/Notification";

export class PushSubscriptionService {
  scheduleNotifications = async () => {
    try {
      const notifications = await Notification.find().exec();

      for (const notification of notifications) {
        console.log("Notification: ", notification);
      }
    } catch (error) {
      logger.error(`Error while trying to schedule notifications`, error);
    }
  };

  sendPushNotification(notification: NotificationModel) {
    logger.verbose(`Sending push notification`);
  }

  saveOrUpdatePushSubscription = async (
    accountName: string,
    subscription: PushSubscription
  ): Promise<PushNotificationSubscriptionModel> => {
    try {
      const existingSubscription = await PushNotificationSubscription.findOne({
        accountName
      }).exec();

      // If the user has subscribed in any way, check if this endpoint needs an update
      if (existingSubscription) {
        const index = existingSubscription.subscriptions.findIndex(
          x => x.endpoint === subscription.endpoint
        );
        if (index === -1) {
          existingSubscription.subscriptions.push(subscription);
        } else {
          existingSubscription.subscriptions[index] = subscription;
        }
        existingSubscription.markModified("subscriptions");
        return await existingSubscription.save();
      } else {
        const pushSubscription = new PushNotificationSubscription({
          accountName,
          subscriptions: [subscription]
        });

        const subscriptionSave = await pushSubscription.save();
        return subscriptionSave;
      }
    } catch (error) {
      logger.error(`error trying to save subscription`, error);
      return null;
    }
  };

  getSubscriptionForAccount = async (accountName: string) => {
    const subscription = await PushNotificationSubscription.findOne({
      accountName
    }).exec();
    return subscription;
  };
}
