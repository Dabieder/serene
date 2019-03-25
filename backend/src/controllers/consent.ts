import { Request, Response, NextFunction } from "express";
import { User, PrivacySetting, UserModel } from "../models/User";
import { consent } from "../data/consent";
import { KafkaService } from "../services/KafkaService";
import { TrustStorService } from "../services/TrustStoreService";
import { ConsentItemModel } from "../models/Consent";
import logger from "../util/logger";
import { UserService } from "../services/UserService";

export class ConsentController {
  constructor(
    private kafkaService: KafkaService,
    private trustStoreService: TrustStorService,
    private userService: UserService
  ) {}
  getCourseConsent = (req: Request, res: Response, next: NextFunction) => {
    logger.verbose("Request Consent For User: " + req.payload.sub);
  };

  postCourseConsent = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    logger.verbose("Post Consent For User: " + req.payload.sub);
  };
}
