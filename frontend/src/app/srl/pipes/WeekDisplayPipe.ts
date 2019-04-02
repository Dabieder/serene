import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment";
import { Week } from "../models/week";

@Pipe({ name: "weekDisplay" })
export class WeekDisplayPipe implements PipeTransform {
  dateFormatOptionsWeekSelector: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    year: "2-digit",
    month: "2-digit"
  };

  transform(week: Week): string {
      return `${moment(week.startDate).format("L")} - ${moment(week.endDate).format("L")}`;
  }
}
