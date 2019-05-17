import { Component, OnInit, Input } from "@angular/core";
import { Store } from "@ngrx/store";
import { SrlWidgetState } from "../store";
import { SubmitNewPlanAction } from "../store/srl-widget.actions";
import { LearningPlan } from "../models/learning-plan";
import { BaseComponent } from "src/app/core/base-component";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { TimeService } from "src/app/shared/services/time.service";
import { PlanService } from "../services/plan.service";
import { Observable } from "rxjs";
import { ApplicationSettings } from "src/app/settings/models/application-settings";
import { SettingsService } from "src/app/settings/services/settings.service";
@Component({
  selector: "app-plan-dialog",
  templateUrl: "./plan-dialog.component.html",
  styleUrls: ["./plan-dialog.component.scss"]
})
export class PlanDialogComponent extends BaseComponent implements OnInit {
  @Input() plan: LearningPlan = new LearningPlan();

  applicationSettings$: Observable<ApplicationSettings>;

  title: string;
  constructor(
    private store$: Store<SrlWidgetState>,
    private router: Router,
    private planService: PlanService,
    private route: ActivatedRoute,
    private settingsService: SettingsService
  ) {
    super();
    this.route.paramMap.subscribe(params => {
      const id = params.get("id");
      console.log("Id is: ", params);
      if (id === "new") {
        this.title = "Add Goal";
        this.plan = LearningPlan.createForDate(new Date(Date.now()));
      } else {
        this.title = "Edit Goal";
        this.plan = this.planService.getPlanById(id);
      }
    });

    this.calculateTotalTime();
  }

  ngOnInit() {
    this.applicationSettings$ = this.settingsService.getApplicationSettings();
  }

  closeDialog() {
    this.router.navigate([`serene/monitor`]);
  }

  onLearningGoalChange(event: any) {
    this.plan.goal = event.target.value;
  }

  onStartDateChange(deadline: Date) {
    this.plan.startDate = deadline;
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
