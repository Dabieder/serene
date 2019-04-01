import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { MatDatepickerInputEvent } from "@angular/material";
import * as moment from "moment";
import { Time } from "@angular/common";
import { TimeService } from "src/app/shared/services/time.service";

@Component({
  selector: "app-plan-date",
  templateUrl: "./plan-date.component.html",
  styleUrls: ["./plan-date.component.scss"]
})
export class PlanDateComponent implements OnInit {
  deadlineHours: number;
  deadlineMinutes: number;
  time: string;

  private _date: Date;
  @Input("date")
  set date(date: Date) {
    this._date = moment(date).toDate();
    this.deadlineHours = this._date.getHours();
    this.deadlineMinutes = this._date.getMinutes();

    this.time = `${TimeService.addLeadingZero(
      this.deadlineHours
    )}:${TimeService.addLeadingZero(this.deadlineMinutes)}`;
  }
  get date() {
    return this._date;
  }
  @Output() dateChange = new EventEmitter<Date>();
  constructor() {}

  ngOnInit() {}

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    const dateVal = moment(event.value).toDate();
    dateVal.setHours(this.deadlineHours);
    dateVal.setMinutes(this.deadlineMinutes);
    this.date = dateVal;
    this.dateChange.emit(this.date);
  }

  onTimeChange(event: any) {
    const time = TimeService.getTimeFromTimeString(event.target.value);
    this.deadlineHours = time.hours;
    this.deadlineMinutes = time.minutes;

    if (this.date) {
      this.date.setHours(this.deadlineHours, this.deadlineMinutes);
      console.log("On Time Change Input: ", this.date);
      this.dateChange.emit(this.date);
    }
  }

  parseDate(dateString: string): Date {
    if (dateString) {
      return moment(dateString).toDate();
    } else {
      return null;
    }
  }
}
