import * as jwt from "jsonwebtoken";
import { User, getHashAndSalt, GetUserWithDefaults } from "../models/User";
import logger from "../util/logger";
import { JWT_SECRET } from "../util/secrets";
import userList from "../data/userList";
import { defaultSettings } from "../data/defaultSettings";
import { ExperimentService } from "./ExperimentService";
import { EventUserCreate } from "../util/Events";
import { EventService } from "./EventService";

export class UserService {
  constructor(private eventService: EventService) {}

  async generateUsersFromFile() {
    logger.verbose(
      "Attempting to create users that are provided in the user list"
    );
    for (const user of userList) {
      await this.createUser(user[0], user[1]).catch(err =>
        logger.error(`Error trying to create test user: ${user[0]}`)
      );
    }
  }

  async createUser(accountName: string, password: string) {
    try {
      const existing = await User.findOne({ accountName: accountName }).exec();
      if (existing) {
        logger.debug(`User ${accountName} already exists`);
        return existing;
      } else {
        const newUser = GetUserWithDefaults(accountName, password);
        const createdUser = await newUser.save().catch(e => {
          logger.error(
            `Error when trying to create new user: ${accountName}`,
            e
          );
        });

        this.eventService.GlobalEventEmitter.emit(EventUserCreate, createdUser);
        return createdUser;
      }
    } catch (err) {
      logger.error(`Error while trying to create a new user:`, err);
      return err;
    }
  }

  async deleteUser(accountName: string) {
    return await User.deleteOne({ accountName }).exec();
  }

  async getUser(accountName: string) {
    return await User.findOne({ accountName }).exec();
  }

  verfifyToken(token: string) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
          resolve(false);
          return;
        }

        resolve(true);
        return;
      });
    }) as Promise<boolean>;
  }
}
