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

    try {
      this.notificationService.sendAllRegisteredNotifications();

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
