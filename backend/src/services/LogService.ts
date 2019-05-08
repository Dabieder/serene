import { UserLog, UserLogModel } from "../models/UserLogs";
import logger from "../util/logger";
import { ApplicationLog } from "../models/ApplicationLogs";

export class LogService {
  constructor() {}

  async addEventLogs(logs: any, accountName: string) {
    const navigations: any[] = [];
    const notificationInteractions: any[] = [];
    const other = [];
    try {
      let userLog = await UserLog.findOne({ accountName }).exec();

      if (userLog) {
        for (const log of logs) {
          switch (log.type) {
            case "navigation":
              navigations.push(log);
              break;
            case "notificationInteraction":
              notificationInteractions.push(log);
            default:
              other.push(log);
          }
        }
        userLog = userLog as UserLogModel;

        userLog.navigations = userLog.navigations.concat(navigations);
        userLog.notificationInteractions = userLog.notificationInteractions.concat(
          notificationInteractions
        );
        userLog.logs = userLog.logs.concat(other);
      } else {
        userLog = new UserLog({
          accountName,
          logs,
          navigations,
          notificationInteractions
        });
      }

      await userLog.save();
    } catch (error) {
      logger.error(`Error trying to save logs for user ${accountName}`, error);
    }
  }

  async addEditLog(edittedPlan: any, accountName: string) {
    logger.info(`Appending edit to logs`);
    try {
      const logs = await UserLog.findOne({ accountName }).exec();
      if (!logs.edits) {
        logs.edits = [];
      }
      logs.edits.push({ ...edittedPlan });
      await logs.save();
    } catch (error) {
      logger.error(`Error trying to append the edit to the logs: `, error);
    }
  }

  async addPlanDeletionLog(deletedPlan: any, accountName: string) {
    logger.info(`Appending deletion to logs`);
    try {
      const logs = await UserLog.findOne({ accountName }).exec();
      if (!logs.deletions) {
        logs.deletions = [];
      }
      logs.deletions.push({ ...deletedPlan });
      await logs.save();
    } catch (error) {
      logger.error(`Error trying to append the deletion to the logs: `, error);
    }
  }

  async addNotificationInteractionLog(log: any, accountName: string) {
    logger.info(`Appending notification interaction to logs`);
    try {
      const logs = await UserLog.findOne({ accountName }).exec();
      if (!logs.notificationInteractions) {
        logs.notificationInteractions = [];
      }
      logs.notificationInteractions.push({ ...log });
      await logs.save();
    } catch (error) {
      logger.error(
        `Error trying to append the notification interaction to the logs: `,
        error
      );
    }
  }

  async addServerLog(log: any) {
    ApplicationLog.updateOne(
      {},
      {
        $push: {
          logs: log
        }
      }
    )
      .exec()
      .then()
      .catch((error: any) => {
        logger.error(`Error trying to append to server logs: `, error);
      });
  }
}
