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
import { TimeService } from "src/app/shared/services/time.service";
import { Observable } from "rxjs";
import { ApplicationSettings } from "src/app/settings/models/application-settings";
import { SettingsService } from "src/app/settings/services/settings.service";

@Component({
  selector: "app-srl-subplan-item",
  templateUrl: "./subplan-item.component.html",
  styleUrls: ["./subplan-item.component.scss"]
})
export class SubPlanItemComponent implements OnInit {
  applicationSettings$: Observable<ApplicationSettings>;
  toTimeValid = true;
  @Input()
  name: string;
  @Output()
  planChange = new EventEmitter<Plan>();
  hoursDisplay = "0";
  private _plan: Plan;
  @Input("plan")
  set plan(newPlan: Plan) {
    newPlan.startDate = moment(newPlan.startDate).toDate();
    newPlan.endDate = moment(newPlan.endDate).toDate();
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
  @ViewChild("container", { static: false })
  container;
  expanded: boolean;

  constructor(private settingsService: SettingsService) {}

  ngOnInit() {
    this.applicationSettings$ = this.settingsService.getApplicationSettings();
  }

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

  // onFromTimeChange(event: Time) {
  //   this._plan.startDate = new Date(this._plan.endDate);
  //   this._plan.startDate.setHours(event.hours, event.minutes);
  //   if (!this.startDateBeforeEndDate()) {
  //     if (this._plan.startDate.getHours() <= 23) {
  //       this._plan.endDate = moment(this._plan.startDate)
  //         .add(15, "m")
  //         .toDate();
  //     }
  //   }
  //   this.setTotalTime();
  //   this.planChange.emit(this._plan);
  // }

  // onToTimeChange(event: Time) {
  //   this._plan.endDate = new Date(this._plan.endDate);
  //   this._plan.endDate.setHours(event.hours, event.minutes);

  //   // Only 'accept' the new input if the to-time is after the from time
  //   this.toTimeValid = this.startDateBeforeEndDate();
  //   if (!this.toTimeValid) {
  //     this.setTotalTime();
  //     this.planChange.emit(this._plan);
  //   }
  // }

  onStartDateChange(startDate: Date) {
    console.log("Start Date change:", startDate);
    this._plan.startDate = startDate;

    this.toTimeValid = this.startDateBeforeEndDate();
    if (this.toTimeValid) {
      this.setTotalTime();
      this.planChange.emit(this._plan);
    }
  }

  onEndDateChange(endDate: Date) {
    console.log("End Date change:", endDate);
    this._plan.endDate = endDate;

    this.toTimeValid = this.startDateBeforeEndDate();
    if (this.toTimeValid) {
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
