import { Request, Response, NextFunction } from "express";
import logger from "../util/logger";
import { User } from "../models/User";

export class ConsentController {
  constructor() {}
  getCourseConsent = (req: Request, res: Response, next: NextFunction) => {
    logger.verbose("Request Consent For User: " + req.payload.sub);

    res.status(200);
  };

  postCourseConsent = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    logger.verbose("Post Consent For User: " + req.payload.sub);
    try {
      const user = await User.findOneAndUpdate(
        {
          accountName: req.payload.sub
        },
        { $set: { consented: true } }
      ).exec();
      return res.status(200).json({
        message: "Updated settings",
        user
      });
    } catch (error) {
      logger.error(`Error trying to set consent:`, error);
    }
  };
}
