import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { MatDatepickerInputEvent } from "@angular/material";
import * as moment from "moment";
import { Time } from "@angular/common";

@Component({
  selector: "app-plan-date",
  templateUrl: "./plan-date.component.html",
  styleUrls: ["./plan-date.component.scss"]
})
export class PlanDateComponent implements OnInit {
  deadlineHours: number;
  deadlineMinutes: number;

  private _date: Date;
  @Input("date")
  set date(date: Date) {
    this._date = moment(date).toDate();
    this.deadlineHours = this._date.getHours();
    this.deadlineMinutes = this._date.getMinutes();
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

  onTimeChange(event: Time) {
    this.deadlineHours = event.hours;
    this.deadlineMinutes = event.minutes;
    if (this.date) {
      this.date.setHours(this.deadlineHours, this.deadlineMinutes);

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
