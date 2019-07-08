import { Component, OnInit, Input } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { takeUntil } from "rxjs/operators";
import {
  SrlWidgetState,
  getLearningPlans,
  getReasons,
  getTags
} from "../store";
import { BaseComponent } from "src/app/core/base-component";
import {
  DeletePlanAction,
  ShowPlanDialogAction,
  SubmitMonitoringAction
} from "../store/srl-widget.actions";
import { RatingItem } from "../models/rating-item";
import { LearningPlan } from "../models/learning-plan";
import { Router } from "@angular/router";
import * as moment from "moment";
import { Monitoring } from "../models/monitoring";
import { Tag } from "src/app/shared/models/tag";

@Component({
  selector: "app-srl-monitoring-page",
  templateUrl: "./monitoring-page.component.html",
  styleUrls: ["./monitoring-page.component.scss"]
})
export class MonitoringPageComponent extends BaseComponent implements OnInit {
  reasons: RatingItem[];
  learningPlansToday: LearningPlan[] = [];
  learningPlansOverDue: LearningPlan[] = [];
  learningPlansOpen: LearningPlan[] = [];
  tags$ = this.store$.pipe(select(getTags));
  private _monitoring: Monitoring = new Monitoring();
  private _learningPlans: LearningPlan[] = [];
  @Input("learningPlans")
  set learningPlans(learningPlans: LearningPlan[]) {
    this.learningPlansToday = [];
    this._learningPlans = learningPlans;
    const plansFlattened = this.getLearningPlansFlattened(learningPlans);

    this.learningPlansOpen = learningPlans.filter(x => x.completed === false);
    this.learningPlansOpen.sort((a, b) => (a.endDate >= b.endDate ? 1 : -1));
    // const todayDate = moment(new Date());

    // for (const plan of learningPlans) {
    //   const planAndSubPlansFlattened = this.getLearningPlansFlattened([plan]);

    //   for (const subplan of planAndSubPlansFlattened) {
    //     // If one of the (sub)plans is due for today, the plan is added to the plans due today
    //     if (
    //       moment(subplan.startTime).isSame(todayDate, "d") ||
    //       moment(subplan.deadline).isSame(todayDate, "d")
    //     ) {
    //       if (this.learningPlansToday.findIndex(p => p === plan) === -1) {
    //         this.learningPlansToday.push(plan);
    //       }
    //     }

    //     // If one of the plans was due in the past, they are added to the overdue array
    //     if (
    //       moment(subplan.startTime).isBefore(todayDate, "d") ||
    //       moment(subplan.deadline).isBefore(todayDate, "d")
    //     ) {
    //       this.learningPlansOverDue.push(plan);
    //     }
    //   }
    // }
  }

  get learningPlans() {
    return this._learningPlans;
  }

  getLearningPlansFlattened(learningPlans: LearningPlan[]): LearningPlan[] {
    let flattened = [];
    for (const plan of learningPlans) {
      flattened.push(plan);
      if (plan.subPlans && plan.subPlans.length > 0) {
        flattened = [
          ...flattened,
          ...this.getLearningPlansFlattened(plan.subPlans)
        ];
      }
    }
    return flattened;
  }

  constructor(private store$: Store<SrlWidgetState>, private router: Router) {
    super();
  }

  ngOnInit() {
    this.store$
      .pipe(
        select(getLearningPlans),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((learningPlans: LearningPlan[]) => {
        if (learningPlans) {
          this.learningPlans = [...learningPlans];
        }
      });

    this.store$
      .pipe(
        select(getReasons),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((reasons: RatingItem[]) => {
        if (reasons) {
          // TODO: this is a temporary but stupid deep copy method, replace
          this.reasons = JSON.parse(JSON.stringify(reasons));
        }
      });
  }

  onReasonsChanged(ratingItem: RatingItem) {
    console.log("Reason Changed: ", ratingItem);
    const index = this._monitoring.reasons.findIndex(
      x => x.name === ratingItem.name
    );
    if (index === -1) {
      this._monitoring.reasons.push({
        name: ratingItem.name,
        rating: ratingItem.rating
      });
    }
  }

  onPlanChanged(learningPlan: LearningPlan) {
    console.log("Plan Changed Event");
    const idx = this._monitoring.plans.findIndex(x => x.id === learningPlan.id);
    if (idx === -1) {
      this._monitoring.plans.push({ ...learningPlan });
    } else {
      this._monitoring.plans[idx] = { ...learningPlan };
    }
  }

  onPlanCompleted(learningPlan: LearningPlan) {
    // this.store$.dispatch(new CompletePlanAction({ plan: learningPlan }));
  }

  deletePlan(learningPlan: LearningPlan) {
    const c = confirm("Do you really want to delete this plan?");
    if (c) {
      this.store$.dispatch(new DeletePlanAction({ plan: learningPlan }));
    }
  }

  editPlan(learningPlan: LearningPlan) {
    this.store$.dispatch(new ShowPlanDialogAction({ learningPlan }));
    this.router.navigate(["/serene/plan/", learningPlan.id]);
  }

  submit() {
    this._monitoring.date = new Date(Date.now());
    this.store$.dispatch(
      new SubmitMonitoringAction({ monitoring: { ...this._monitoring } })
    );
    // this.store$.dispatch(new UpdatePlansAction({ plans: this.learningPlans }));
    this.router.navigate([`serene/reflect`]);
  }

  closeDialog() {
    this.router.navigate([`serene/reflect`]);
  }

  tagActivated(tag: Tag) {
    console.log("Filter Activated: ", tag);
  }

  tagDeActivated(tag: Tag) {
    console.log("Tag DeActivated: ", tag);
  }
}
