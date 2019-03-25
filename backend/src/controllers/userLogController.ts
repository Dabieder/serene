import { Request, Response, NextFunction } from "express";
import { UserLog, UserLogModel } from "../models/UserLogs";
import logger from "../util/logger";

export class UserLogController {
  constructor() {}

  submitLogs = async (req: Request, res: Response, next: NextFunction) => {
    logger.info(`Receiving Log Submit from: ${req.payload.sub}`);

    let userLog = await UserLog.findOne({ accountName: req.payload.sub })
      .exec()
      .catch(err => {
        const msg = `Error when trying to find user logs for use ${
          req.payload.sub
        }`;
        res.status(500).json({
          error: msg
        });
        return next(err);
      });

    if (userLog) {
      userLog = userLog as UserLogModel;

      userLog.logs = userLog.logs.concat(req.body);
    } else {
      userLog = new UserLog({
        accountName: req.payload.sub,
        logs: req.body
      });
    }
    await userLog.save().catch(err => {
      const msg = `Error saving User Logs for user: ${req.payload.sub}`;
      logger.error(msg);
      res.status(500).json({
        error: msg
      });
      return next(err);
    });

    return res.status(200).json({
      error: null
    });
  };
}
