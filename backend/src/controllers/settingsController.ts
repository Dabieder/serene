import { Request, Response, NextFunction } from "express";
import { User } from "../models/User";
import logger from "../util/logger";
import { Settings } from "../models/Settings";
import { SettingsService } from "../services/SettingsService";

export class SettingsController {
  constructor(private settingsService: SettingsService) {}

  getAllSettings = async (req: Request, res: Response, next: NextFunction) => {
    logger.info(`Retrieving settings for: ${req.payload.sub}`);

    try {
      const settings = await this.settingsService.getSettingsForUser(
        req.payload.sub
      );

      if (settings) {
        return res.status(200).json({
          data: settings
        });
      } else {
        return res.status(404);
      }
    } catch (err) {
      logger.error(`Error trying to post settings for ${req.payload.sub}`, err);
      res.status(500);
      return next(err);
    }
  };

  postSettings = async (req: Request, res: Response, next: NextFunction) => {
    logger.info(`Posting settings for ${req.payload.sub}`);
    try {
      const updatedSettings = await this.settingsService.updateSettings(
        req.payload.sub,
        req.body
      );

      return res.status(200).json({
        message: "Updated settings"
      });
    } catch (err) {
      logger.error(`Error trying to post settings for ${req.payload.sub}`, err);
      res.status(500);
      return next(err);
    }
  };

  getConsentSettings = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    logger.info(`Retrieving Consent for ${req.payload.sub}`);
    logger.error(`Method getConsentSettings not really implemented at the moment`);
    res.status(200);
  };
}
