import { PushSubscriptionService } from "../services/PushSubscriptionService";
import { Request, Response, NextFunction } from "express";
import logger from "../util/logger";

export class PushSubscriptionController {
  constructor(private subscriptionService: PushSubscriptionService) {}

  postPushRegistration = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    logger.info(
      `Received post to register notifications for ${req.payload.sub}`
    );

    const saved = await this.subscriptionService.saveOrUpdatePushSubscription(
      req.payload.sub,
      req.body
    );

    if (saved) {
      return res.status(200).json({
        error: null
      });
    } else {
      logger.error(`Error trying to save subscription for ${req.payload.sub}`);
      return res.status(500).json({
        error: "Error trying to save subscription"
      });
    }
  };
}
