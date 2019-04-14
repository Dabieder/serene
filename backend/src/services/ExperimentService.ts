import * as nodeCron from "node-cron";
import { Experiment } from "../models/Experiment";
import { User, UserModel } from "../models/User";
import logger from "../util/logger";
import { EventUserCreate } from "../util/Events";
import { EventEmitter } from "events";
import { EventService } from "./EventService";
// TODO: Change this class for every experiment.

export const ExperimentMonitorReminderTiming = "MonitorReminderTiming";
export const ExperimentPlanReminderTiming = "PlanReminderTiming";

export const GroupMonitorReminderFix = "MonitorReminderFix";
export const GroupMonitorReminderByTask = "MonitorReminderByTask";
export const GroupCreatePlanReminderRarely = "PlanReminderRarely";
export const GroupCreatePlanReminderOften = "PlanReminderOften";

export class ExperimentService {
  notificationInterval = +process.env["NOTIFICATION_CHECK_INTERVAL"]
    ? +process.env["NOTIFICATION_CHECK_INTERVAL"]
    : 60000;

  constructor(private eventService: EventService) {
    this.registerForUserEvents();
  }

  async initialize() {
    try {
      await this.initExperiment();
    } catch (err) {
      logger.error("Error in creating node-cron jobs: ", err);
    }

    // Every sunday and wednesday at 10 send reminder to create new plans
    const planReminderGroupOneRemindToCreatePlansTask = nodeCron.schedule(
      "* * 10 * * Sunday,Wednesday",
      () => {
        this.sendReminderToCreatePlansGroupOne();
      }
    );
    planReminderGroupOneRemindToCreatePlansTask.start();

    // Every day at 10 send reminder to create new plans for monitoring group one
    const monitorReminderGroupOneRemindToMonitor = nodeCron.schedule(
      "* * 10 * * *",
      () => {
        this.sendReminderToMonitorGroupOne();
      }
    );
    monitorReminderGroupOneRemindToMonitor.start();

    // Every five minutes check if the groups needs to be reminded after a plan was finished
    const monitorReminderGroupTwoRemindToMonitor = nodeCron.schedule(
      "* * 10 * * *",
      () => {
        this.sendReminderToCreatePlansGroupOne();
      }
    );
    monitorReminderGroupTwoRemindToMonitor.start();
  }

  async initExperiment() {
    const experimentPlanReminder = await Experiment.findOne({
      name: ExperimentPlanReminderTiming
    }).exec();

    if (!experimentPlanReminder) {
      const newExperiment = new Experiment({
        name: ExperimentPlanReminderTiming,
        startDate: new Date("2019-4-15"),
        endDate: new Date("2019-9-15"),
        groups: [
          {
            name: GroupCreatePlanReminderRarely,
            participants: [],
            conditions: {}
          },
          {
            name: GroupCreatePlanReminderOften,
            participants: [],
            conditions: {}
          }
        ]
      });
      await newExperiment.save();
    }

    const experimentMonitorReminder = await Experiment.findOne({
      name: ExperimentMonitorReminderTiming
    }).exec();

    if (!experimentMonitorReminder) {
      const newExperiment = new Experiment({
        name: ExperimentMonitorReminderTiming,
        startDate: new Date("2019-4-15"),
        endDate: new Date("2019-9-15"),
        groups: [
          {
            name: GroupMonitorReminderByTask,
            participants: [],
            conditions: {}
          },
          {
            name: GroupMonitorReminderFix,
            participants: [],
            conditions: {}
          }
        ]
      });

      await newExperiment.save();
    }
  }

  registerForUserEvents() {
    this.eventService.GlobalEventEmitter.addListener(
      EventUserCreate,
      (e: UserModel) => {
        this.handleAssignmentNewUser(e);
      }
    );
  }

  async handleAssignmentNewUser(user: UserModel) {
    try {
      const experimentMonitoring = await Experiment.findOne({
        name: ExperimentMonitorReminderTiming
      }).exec();
      const conditionMonitorReminder = Math.round(Math.random());
      experimentMonitoring.groups[conditionMonitorReminder].participants.push(
        user.accountName
      );
      await experimentMonitoring.save();

      const experimentPlanning = await Experiment.findOne({
        name: ExperimentPlanReminderTiming
      }).exec();
      const conditionPlanReminder = Math.round(Math.random());
      experimentPlanning.groups[conditionPlanReminder].participants.push(
        user.accountName
      );
      await experimentPlanning.save();
    } catch (error) {
      logger.error(
        `Error when trying to assign newly created user to experimental condition: `,
        error
      );
    }
  }

  async assignUsersToGroups() {
    // throw new Error("Method not implemented.");
    try {
      const users = await User.find().exec();

      const experiments = await Experiment.find().exec();

      if (users) {
        for (const user of users) {
        }
      }
    } catch (error) {
      logger.error(
        `Error while trying to assign all users to a group: `,
        error
      );
    }
  }

  async sendReminderToCreatePlansGroupOne() {}

  async sendReminderToMonitorGroupOne() {}

  async sendReminderToMonitorGroupTwo() {
    const expGroup = 1;
  }
}
