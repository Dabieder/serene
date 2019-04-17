import { Component, OnInit } from "@angular/core";
import {
  SrlWidgetState,
  getCompletedLearningPlans,
  getLearningPlans
} from "../store";
import { Store, select } from "@ngrx/store";
import { BaseComponent } from "src/app/core/base-component";
import { filter, map } from "rxjs/operators";
import { LearningPlan } from "../models/learning-plan";

@Component({
  selector: "app-completed-plan-list",
  templateUrl: "./completed-plan-list.component.html",
  styleUrls: ["./completed-plan-list.component.scss"]
})
export class CompletedPlanListComponent extends BaseComponent
  implements OnInit {
  completedPlans$ = this.store$.pipe(
    select(getLearningPlans),
    map(plans => plans.filter(plan => plan.completed))
  );

  constructor(private store$: Store<SrlWidgetState>) {
    super();
  }

  ngOnInit() {}

  completedOnTime(plan: LearningPlan) {
    return LearningPlan.isCompletedBeforeDeadline(plan);
  }
}
