import { Component, Input } from "@angular/core";
import { LearningPlan } from "../models/learning-plan";
import { Plan } from "../models/plan";

@Component({
  selector: "app-monitor-date-display",
  template: `
    <div
      class="row ml-4 text-muted"
      [ngClass]="{
        'text-muted': beforeDeadline(plan),
        'goal-late': !beforeDeadline(plan)
      }"
    >
      <mat-icon class="mat-icon-small" svgIcon="calendar"> </mat-icon>
      <span class="ml-2 mr-2 mt-0">
        {{ plan.endDate | date: "dd.MM.yyyy" }}
      </span>
      <span class="mt-0">
        {{ plan.endDate | date: "HH:mm" }}
      </span>
    </div>
  `,
  styles: [
    `
      .goal-late {
        color: rgb(180, 80, 80);
        font-size: 0.8em;
        font-weight: bold;
      }
    `
  ]
})
export class MonitorDateDisplayComponent {
  @Input() plan: Plan;

  beforeDeadline(plan: Plan) {
    return LearningPlan.isBeforeDeadline(plan);
  }
}
