import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild
} from "@angular/core";
import { MatSliderChange, MatDatepickerInputEvent } from "@angular/material";
import { addLeadingZero } from "src/app/core/utility/utility-functions";
import * as moment from "moment";
import { Plan } from "../models/plan";
import { Time } from "@angular/common";
import { TimeService } from "src/app/shared/services/time.service";

@Component({
  selector: "app-srl-subplan-item",
  templateUrl: "./subplan-item.component.html",
  styleUrls: ["./subplan-item.component.scss"]
})
export class SubPlanItemComponent implements OnInit {
  toTimeValid = true;
  @Input()
  name: string;
  @Output()
  planChange = new EventEmitter<Plan>();
  hoursDisplay = "0";
  private _plan: Plan;
  @Input("plan")
  set plan(newPlan: Plan) {
    const roundedStartTime = TimeService.roundToQuarterHours({
      hours: newPlan.startDate.getHours(),
      minutes: newPlan.startDate.getMinutes()
    });
    newPlan.startDate.setHours(roundedStartTime.hours);
    newPlan.startDate.setMinutes(roundedStartTime.minutes);
    this._plan = newPlan;
    this.hoursDisplay = TimeService.toTimeDisplay(newPlan.plannedDuration);
    this.planChange.emit(this.plan);
  }
  get plan() {
    return this._plan;
  }
  @ViewChild("container")
  container;
  expanded: boolean;

  constructor() {}

  ngOnInit() {}

  onSliderValueChange(event: MatSliderChange) {
    this.plan.plannedDuration = TimeService.decimalNumberToTime(event.value);
    this.planChange.emit(this._plan);
    this.hoursDisplay = TimeService.toTimeDisplay(this.plan.plannedDuration);
  }

  onSliderValueInput(event: MatSliderChange) {
    this.hoursDisplay = TimeService.toTimeDisplay(
      TimeService.decimalNumberToTime(event.value)
    );
  }

  dayExpandToggle(event: any) {
    this.expanded = !this.expanded;
  }

  parseDate(dateString: string): Date {
    if (dateString) {
      return moment(dateString).toDate();
    } else {
      return null;
    }
  }

  onFromTimeChange(event: Time) {
    this._plan.startDate = new Date(this._plan.endDate);
    this._plan.startDate.setHours(event.hours, event.minutes);
    if (!this.startDateBeforeEndDate()) {
      if (this._plan.startDate.getHours() <= 23) {
        this._plan.endDate = moment(this._plan.startDate)
          .add(15, "m")
          .toDate();
      }
    }
    this.setTotalTime();
    this.planChange.emit(this._plan);
  }

  onToTimeChange(event: Time) {
    this._plan.endDate = new Date(this._plan.endDate);
    this._plan.endDate.setHours(event.hours, event.minutes);

    // Only 'accept' the new input if the to-time is after the from time
    this.toTimeValid = this.startDateBeforeEndDate();
    if (!this.toTimeValid) {
      this.setTotalTime();
      this.planChange.emit(this._plan);
    }
  }

  startDateBeforeEndDate() {
    return moment(this._plan.startDate).isBefore(moment(this._plan.endDate));
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    const dateVal = moment(event.value).toDate();
    const deadlineOld = moment(this._plan.endDate).toDate();

    this._plan.endDate = dateVal;
    this._plan.endDate.setHours(deadlineOld.getHours());
    this._plan.endDate.setMinutes(deadlineOld.getMinutes());
    this.planChange.emit(this._plan);
  }

  setTotalTime() {
    const duration = moment.duration(
      moment(this.plan.endDate).diff(this.plan.startDate)
    );

    const hours = duration.hours();
    const minutes = duration.minutes();

    this._plan.plannedDuration = { hours, minutes };

    this.hoursDisplay = `${addLeadingZero(hours)}:${addLeadingZero(minutes)}`;
  }

  onSubgoalChange(event: any) {
    console.log("On Subgoal Change", event);
    this.planChange.emit(this.plan);
  }
}
