import { Request, Response, NextFunction } from "express";
import logger from "../util/logger";
import webpush from "web-push";
import { NotificationService } from "../services/NotificationService";
import { Notification, NotificationModel } from "../models/Notification";
import moment = require("moment");
import { PushNotificationSubscriptionModel } from "../models/PushNotificationSubscription";
import { PushSubscriptionService } from "../services/PushSubscriptionService";

export class NotificationController {
  constructor(
    private notificationService: NotificationService,
    private pushSubscriptionService: PushSubscriptionService
  ) {
    const vapidPublic = process.env["VAPID_PUBLIC"];
    const vapidPrivate = process.env["VAPID_PRIVATE"];
    webpush.setVapidDetails(
      "mailto:biedermann@dipf.de",
      vapidPublic,
      vapidPrivate
    );
  }

  sendAllRegisteredNotifications = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    logger.info("Trying to send all pending web push messages");

    const notifications = await Notification.find()
      .exec()
      .catch(e => {
        logger.error(`Error trying to retrieve all subscriptions ${e}`);
      });

    if (!notifications) {
      return res.status(200).json({
        message: `No registered notifications found`
      });
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
          const pushSubscription = await this.pushSubscriptionService.getSubscriptionForAccount(
            notification.accountName
          );
          await this.sendNotificationsToSubscriptions(
            notification,
            pushSubscription
          );
        }
      }

      return res.status(200).json({
        message: `Sent messages successfully`
      });
    } catch (error) {
      return res.status(500).json({
        message: `Error trying to send notification subscriptions: ${error}`
      });
    }
  };

  private sendNotificationsToSubscriptions = async (
    notification: NotificationModel,
    pushSubscription: PushNotificationSubscriptionModel
  ) => {
    for (const subscription of pushSubscription.subscriptions) {
      const notificationPayload = {
        notification: {
          title: "Serene Push Notification Test",
          body: "Here goes the body text",
          vibrate: [100, 100, 200],
          data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
          },
          actions: [
            {
              action: "yes",
              title: "yes"
            },
            {
              action: "no",
              title: "no"
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
