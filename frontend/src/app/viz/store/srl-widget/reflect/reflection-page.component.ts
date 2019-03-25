import { Component, OnInit, Input } from "@angular/core";
import { SurveyResult } from "../models/survey-result";
import { Monitoring } from "../models/monitoring";
import { RatingItem } from "../models/rating-item";
import { LearningPlan } from "../models/learning-plan";
import { SrlWidgetState, getMonitorings, getLearningPlans } from "../store";
import { Store, select } from "@ngrx/store";
import { BaseComponent } from "src/app/core/base-component";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-srl-reflection-page",
  templateUrl: "./reflection-page.component.html",
  styleUrls: ["./reflection-page.component.scss"]
})
export class ReflectionPageComponent extends BaseComponent implements OnInit {
  @Input()
  monitorings: Monitoring[] = [];
  @Input()
  surveyResults: SurveyResult;
  learningPlans: LearningPlan[] = [];

  constructor(private store$: Store<SrlWidgetState>) {
    super();
  }

  ngOnInit() {
    this.store$
      .pipe(
        select(getMonitorings),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((monitorings: Monitoring[]) => {
        if (monitorings) {
          this.monitorings = monitorings;
        }
      });

    this.store$
      .pipe(
        select(getLearningPlans),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(learningPlans => {
        if (learningPlans) {
          this.learningPlans = learningPlans;
        }
      });
  }
}
