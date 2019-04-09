import { Settings } from "../models/Settings";
import logger from "../util/logger";
import { defaultSettings } from "../data/defaultSettings";
import { User } from "../models/User";

export class SettingsService {
  constructor() {}

  getSettingsForUser = async (accountName: string) => {
    try {
      const user = await User.findOne({
        accountName
      }).exec();

      return user.settings;
    } catch (error) {
      logger.error(`Error trying to retrieve settings`, error);
      return null;
    }
  };

  createDefaultSettingsForUser = async (accountName: string) => {
    try {
      const newSettings = new Settings({
        accountName,
        settings: defaultSettings
      });
      await newSettings.save();
      return newSettings;
    } catch (error) {
      logger.error(`Error trying to create new default settings`, error);
      return null;
    }
  };

  updateSettings = async (accountName: string, settings: any) => {
    try {
      return await User.findOneAndUpdate(
        {
          accountName
        },
        {
          $set: {
            settings: settings
          }
        }
      ).exec();
    } catch (error) {
      logger.error(`Error trying to update settings`, error);
      return null;
    }
  };
}
