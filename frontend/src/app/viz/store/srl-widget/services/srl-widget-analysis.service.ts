import { Injectable } from "@angular/core";
import * as moment from "moment";
import { LearningPlan } from "../models/learning-plan";

export interface ICompletedPlanOverview {
  completedOnTime: LearningPlan[];
  completedBehindSchedule: LearningPlan[];
  openOnTime: LearningPlan[];
  openBehindSchedule: LearningPlan[];
}

@Injectable({
  providedIn: "root"
})
export class SrlWidgetAnalysisService {
  getPlansByCompletion(plans: LearningPlan[]): ICompletedPlanOverview {
    const completedOnTime = [];
    const completedBehindSchedule = [];
    const openOnTime = [];
    const openBehindSchedule = [];

    for (const plan of plans) {
      if (plan.completed) {
        if (this.isCompletedBeforeDeadline(plan)) {
          completedOnTime.push(plan);
        } else {
          completedBehindSchedule.push(plan);
        }
      } else {
        if (this.isBeforeDeadline(plan)) {
          openOnTime.push(plan);
        } else {
          openBehindSchedule.push(plan);
        }
      }
    }

    return {
      completedOnTime,
      completedBehindSchedule,
      openOnTime,
      openBehindSchedule
    };
  }

  isCompletedBeforeDeadline(plan: LearningPlan) {
    if (plan.completed) {
      return moment(plan.completionDate).isBefore(plan.endDate);
    }
    return false;
  }

  isBeforeDeadline(plan: LearningPlan) {
    return moment(new Date(Date.now())).isBefore(plan.endDate);
  }
}
