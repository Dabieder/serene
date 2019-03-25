import { Pipe, PipeTransform } from "@angular/core";
import { Time } from "@angular/common";
import { addLeadingZero } from "src/app/core/utility/utility-functions";

@Pipe({ name: "timedisplay" })
export class TimeDisplayPipe implements PipeTransform {
  transform(time: Time): string {
    return `${addLeadingZero(time.hours)}:${addLeadingZero(time.minutes)}`;
  }
}
