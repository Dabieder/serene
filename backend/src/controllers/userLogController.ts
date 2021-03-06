import { Request, Response, NextFunction } from "express";
import logger from "../util/logger";
import { LogService } from "../services/LogService";

export class UserLogController {
  constructor(private userLogService: LogService) {}

  submitLogs = async (req: Request, res: Response, next: NextFunction) => {
    logger.info(`Receiving Log Submit from: ${req.payload.sub}`);

    this.userLogService.addEventLogs(req.body, req.payload.sub);

    return res.status(200).json({
      error: null
    });
  };

  submitServiceWorkerLogs = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    logger.info(`Receiving Service Worker logs`);

    this.userLogService.addNotificationInteractionLog(
      req.body.event,
      req.body.event.notification.data.accountName
    );

    logger.info(`Req body: `, req.body);
    res.status(200).json({
      message: "Not yet implemented"
    });
  };
}
