import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { addLeadingZero } from "src/app/core/utility/utility-functions";
import * as moment from "moment";
import { Time } from "@angular/common";
import { TimeService } from "src/app/shared/services/time.service";
@Component({
  selector: "app-time-select",
  templateUrl: "./time-select.component.html",
  styleUrls: ["./time-select.component.scss"]
})
export class TimeSelectComponent implements OnInit {
  @Output() timeChange = new EventEmitter<Time>();
  @Input() isValid = true;
  @Input("minTime")
  set minTime(time: Date) {}
  selectedTime: string;
  private _time: Date;
  @Input("time")
  set time(time: Date) {
    if (!time) return;
    this._time = moment(time).toDate();

    const roundedTime = TimeService.roundToQuarterHours({
      hours: this._time.getHours(),
      minutes: this._time.getMinutes()
    });
    // Finding the time in the list of available times that is closest
    const timeString = `${addLeadingZero(roundedTime.hours)}:${addLeadingZero(
      roundedTime.minutes
    )}`;
    this.selectedTime = timeString;
  }
  get time() {
    return this._time;
  }

  times: any[] = [];
  type = "24";
  constructor(private timeService: TimeService) {
    this.times = this.timeService.timeDisplayList;
  }

  onValueChange(event: any) {
    const selectedValue =
      event.target.options[event.target.selectedIndex].value;
    this.selectedTime = selectedValue;
    this.timeChange.emit(this.getTimeFromString(selectedValue));
  }

  getTimeFromString(timeString: string) {
    const time = timeString.split(":");
    console.log("Time: ", this.time);
    const hours = Number(time[0]);
    const minutes = Number(time[1]);
    return { hours, minutes };
  }

  ngOnInit() {}
}
