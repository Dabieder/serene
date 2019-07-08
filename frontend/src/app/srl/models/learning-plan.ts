import { RatingItem } from "./rating-item";
import { Plan } from "./plan";
import { uniqueId } from "src/app/core/utility/utility-functions";
import * as moment from "moment";

export class LearningPlan implements Plan {
  id: string = uniqueId();
  plannedDuration = { hours: 0, minutes: 0 };
  progress = 0;
  comment = "";
  goal = "";
  creationDate: Date = new Date(Date.now());
  startDate: Date;
  endDate: Date;
  subPlans: LearningPlan[] = [];
  parentPlan: LearningPlan;
  completed = false;
  completionDate: Date;
  remind = true;
  reminderDate: Date;
  tags = [];

  static createForDate(date: Date) {
    const plan = new LearningPlan();
    plan.startDate = new Date(date);
    plan.startDate.setHours(date.getHours() + 1);
    plan.endDate = new Date(date);
    plan.endDate.setHours(date.getHours() + 2);
    plan.plannedDuration = { hours: 1, minutes: 0 };
    return plan;
  }

  static isCompletedBeforeDeadline(plan: Plan) {
    if (plan.completed) {
      return moment(plan.completionDate).isBefore(plan.endDate);
    }
    return false;
  }

  static isBeforeDeadline(plan: Plan) {
    return moment(new Date(Date.now())).isBefore(plan.endDate);
  }
}
