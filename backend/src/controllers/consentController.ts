import { Request, Response, NextFunction } from "express";
import logger from "../util/logger";

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
  };
}
