import { Component, OnInit, Input } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { SrlWidgetState, getSelectedLearningPlan } from "../store";
import { SubmitNewPlanAction } from "../store/srl-widget.actions";
import { LearningPlan } from "../models/learning-plan";
import { BaseComponent } from "src/app/core/base-component";
import { takeUntil } from "rxjs/operators";
import { Router } from "@angular/router";
import { TimeService } from "src/app/shared/services/time.service";
@Component({
  selector: "app-plan-dialog",
  templateUrl: "./plan-dialog.component.html",
  styleUrls: ["./plan-dialog.component.scss"]
})
export class PlanDialogComponent extends BaseComponent implements OnInit {
  @Input() plan: LearningPlan = new LearningPlan();

  useStartDate = true;
  useEndDate = true;

  title: string;
  constructor(private store$: Store<SrlWidgetState>, private router: Router) {
    super();

    this.store$
      .pipe(
        select(getSelectedLearningPlan),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(selectedLearningPlan => {
        if (selectedLearningPlan) {
          this.title = "Edit Goal";
          this.plan = { ...selectedLearningPlan };
        } else {
          this.title = "Add Goal";
          this.plan = LearningPlan.createForDate(new Date(Date.now()));
        }
      });

    this.calculateTotalTime();
  }

  ngOnInit() {}

  closeDialog() {
    this.router.navigate([`serene/monitor`]);
  }

  onLearningGoalChange(event: any) {
    this.plan.goal = event.target.value;
  }

  onStartDateChange(deadline: Date) {
    this.plan.endDate = deadline;
  }

  onEndDateChange(deadline: Date) {
    this.plan.endDate = deadline;
  }

  onRemindChange(event: any) {
    console.log("Remind Change", event.checked);
    this.plan.remind = event.checked;
  }

  submit() {
    this.store$.dispatch(new SubmitNewPlanAction({ plan: this.plan }));
    this.router.navigate([`serene/monitor`]);
  }

  addSubPlan(event: any) {
    const date = new Date(Date.now());

    const subgoal = LearningPlan.createForDate(date);
    this.plan.subPlans.push(subgoal);
  }

  deleteSubPlan(event: any, plan: LearningPlan) {
    // const index = this.plan.dailyPlans.findIndex(p => p === plan);
    // this.plan.dailyPlans.splice(index, 1);
    const index = this.plan.subPlans.findIndex(p => p.id === plan.id);
    if (index >= 0) {
      this.plan.subPlans.splice(index, 1);
    }
    this.calculateTotalTime();
  }

  onSubPlanChange(plan: LearningPlan) {
    this.calculateTotalTime();
  }

  calculateTotalTime() {
    let totalTime = { hours: 0, minutes: 0 };
    for (const subPlan of this.plan.subPlans) {
      totalTime = TimeService.addTimes(totalTime, subPlan.plannedDuration);
    }
    this.plan.plannedDuration = totalTime;
  }
}
