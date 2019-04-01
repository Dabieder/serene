import { Injectable } from "@angular/core";
import { Time } from "@angular/common";
import * as moment from "moment";

@Injectable({
  providedIn: "root"
})
export class TimeService {
  constructor() {}

  get timeDisplayList(): string[] {
    if (!this._timeDisplayList) {
      console.log("Creating new Time Display list");
      this._timeDisplayList = this.createTimeDisplayList(
        moment("2099-12-12 00:00"),
        moment("2099-12-12 23:45"),
        4
      );
    }
    return this._timeDisplayList;
  }

  private _timeDisplayList;

  static getTimeFromTimeString(timeString: string): Time {
    const split = timeString.split(":");
    return {
      hours: +split[0],
      minutes: +split[1]
    };
  }

  static addLeadingZero = v => (v >= 10 ? `${v}` : `0${v}`);

  static toTimeDisplay(time: Time) {
    return `${TimeService.addLeadingZero(
      time.hours
    )}:${TimeService.addLeadingZero(time.minutes)}`;
  }

  static decimalNumberToTime(num: number): Time {
    const hours = Math.floor(num);
    const minutes = (num - hours) * 60;
    return { hours, minutes };
  }

  static addTimes(t1: Time, t2: Time): Time {
    let hours = t1.hours + t2.hours;
    let minutes = t1.minutes + t2.minutes;
    hours += Math.floor(minutes / 60);
    minutes = minutes % 60;
    return { hours, minutes };
  }

  static roundToHalfHours(t: Time): Time {
    const newTime = { ...t };
    if (newTime.minutes !== 0) {
      if (newTime.minutes < 15) {
        newTime.minutes = 0;
      }
      if (newTime.minutes >= 15 && newTime.minutes < 45) {
        newTime.minutes = 30;
      }
      if (newTime.minutes >= 45) {
        newTime.minutes = 0;
        newTime.hours += 1;
      }
    }
    return newTime;
  }

  static roundToQuarterHours(t: Time): Time {
    const newTime = { ...t };
    if (newTime.minutes !== 0) {
      if (newTime.minutes < 7) {
        newTime.minutes = 0;
      }
      if (newTime.minutes >= 7 && newTime.minutes < 23) {
        newTime.minutes = 15;
      }
      if (newTime.minutes >= 23 && newTime.minutes < 37) {
        newTime.minutes = 30;
      }
      if (newTime.minutes >= 37 && newTime.minutes < 52) {
        newTime.minutes = 45;
      }
      if (newTime.minutes >= 52) {
        newTime.minutes = 0;
        newTime.hours += 1;
      }
    }
    return newTime;
  }

  private createTimeDisplayList(
    minDate: moment.Moment,
    maxDate: moment.Moment,
    intervals: number
  ) {
    const times = [];
    const currTime = minDate;
    const intervalToAdd = 60 / intervals;
    while (!currTime.isAfter(maxDate)) {
      for (let i = 0; i < intervals; i++) {
        if (!currTime.isAfter(maxDate)) {
          const hour = TimeService.addLeadingZero(currTime.hour());
          const minutes = TimeService.addLeadingZero(currTime.minutes());
          const time = `${hour}:${minutes}`;
          times.push(time);
          currTime.add(intervalToAdd, "minutes");
        }
      }
    }
    return times;
  }
}
