import * as moment from "moment";

export class Week {
  public startDate: string;
  public endDate: string;
  public asKey: string;
  public asDayString: string;

  constructor(date: Date) {
    // First day of the week is monday and all other regions are wrong
    this.startDate = moment(date)
      .weekday(0)
      .format("YYYYMMDD");
    this.endDate = moment(date)
      .weekday(6)
      .format("YYYYMMDD");

    this.asKey = `${this.startDate}-${this.endDate}`;
    this.asDayString = `${moment(date)
      .weekday(0)
      .format("DD.MM")} - ${moment(date)
      .weekday(6)
      .format("DD.MM")}`;
  }

  public equals = (otherWeek: Week) => {
    return moment(this.startDate).isSame(otherWeek.startDate);
  }

  public toString = (): string => {
    return `${this.startDate}-${this.endDate}`;
  }
}
