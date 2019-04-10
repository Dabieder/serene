import { Request, Response, NextFunction } from "express";
import logger from "../util/logger";
import webpush from "web-push";
import { NotificationService } from "../services/NotificationService";
import { Notification } from "../models/Notification";
import moment = require("moment");
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
          await this.notificationService.sendNotificationBasedOnPreference(
            notification
          );
          // TODO: Delete notification after it has been sent
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
}
