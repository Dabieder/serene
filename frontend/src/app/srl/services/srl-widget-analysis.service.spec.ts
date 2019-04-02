import { LearningPlan } from "../models/learning-plan";
import * as moment from "moment";
import { TestBed, inject } from "@angular/core/testing";
import { SrlWidgetAnalysisService } from "./srl-widget-analysis.service";

const momentFormat = "DD-MM-YYYY HH:MM";
const testPlanCompletedOnTime = new LearningPlan();
testPlanCompletedOnTime.goal = "Completed On Time";
testPlanCompletedOnTime.completed = true;
testPlanCompletedOnTime.completionDate = moment(
  "2018-01-02 12:12",
  momentFormat
).toDate();
testPlanCompletedOnTime.endDate = moment(
  "2022-02-03 12:12",
  momentFormat
).toDate();

const testPlanCompletedBehindSchedule = new LearningPlan();
testPlanCompletedBehindSchedule.goal = "Completed behind schedule";
testPlanCompletedBehindSchedule.completed = true;
testPlanCompletedOnTime.completionDate = moment(
  "2018-05-02 12:12",
  momentFormat
).toDate();
testPlanCompletedOnTime.endDate = moment(
  "2000-02-03 12:12",
  momentFormat
).toDate();

const testPlanOpenOnTime = new LearningPlan();
testPlanOpenOnTime.goal = "Open On Time";
testPlanOpenOnTime.completed = false;
testPlanOpenOnTime.endDate = new Date(Date.now());
testPlanOpenOnTime.endDate.setFullYear(2100);

const testPlanOpenBehindSchedule = new LearningPlan();
testPlanOpenBehindSchedule.goal = "Open Behind Schedule";
testPlanOpenBehindSchedule.completed = false;
testPlanOpenBehindSchedule.endDate = new Date(Date.now());
testPlanOpenBehindSchedule.endDate.setFullYear(1990);

describe("SrlWidgetAnalysisService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SrlWidgetAnalysisService]
    });
  });

  it("should be created", inject(
    [SrlWidgetAnalysisService],
    (service: SrlWidgetAnalysisService) => {
      expect(service).toBeTruthy();
    }
  ));
});
