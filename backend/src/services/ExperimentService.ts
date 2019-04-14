import * as nodeCron from "node-cron";

// TODO: Change for every experiment.
export class ExperimentService {
  notificationInterval = +process.env["NOTIFICATION_CHECK_INTERVAL"]
    ? +process.env["NOTIFICATION_CHECK_INTERVAL"]
    : 60000;

  constructor() {}

  async initialize() {
    // Every sunday and wednesday at 10 send reminder to create new plans
    const planReminderGroupOneRemindToCreatePlansTask = nodeCron.schedule(
      "* * 10 * * 0, 3",
      () => {
        this.sendReminderToCreatePlansGroupOne();
      }
    );

    // Every day at 10 send reminder to create new plans for monitoring group one
    const monitorReminderGroupOneRemindToMonitor = nodeCron.schedule(
      "* * 10 * * *",
      () => {
        this.sendReminderToMonitorGroupOne();
      }
    );

    // Every five minutes check if the groups needs to be reminded after a plan was finished
    const monitorReminderGroupTwoRemindToMonitor = nodeCron.schedule(
      "* * 10 * * *",
      () => {
        this.sendReminderToCreatePlansGroupOne();
      }
    );
  }

  async sendReminderToCreatePlansGroupOne() {}

  async sendReminderToMonitorGroupOne() {}

  async sendReminderToMonitorGroupTwo() {}
}
