import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import * as moment from "moment";
import { Week } from "../models/week";

@Component({
  selector: "app-week-overview",
  templateUrl: "./week-overview.component.html",
  styleUrls: ["./week-overview.component.scss"]
})
export class WeekOverviewComponent implements OnInit {
  weekList: Week[] = [];
  @Output()
  weekSelectionChange: EventEmitter<Week> = new EventEmitter();
  @Input()
  visible: boolean;
  @Input("weeks")
  set weeks(weeks: Week[]) {
    this.weekList = [...weeks];

    this.weekList.sort((a, b) => {
      return moment
        .utc(a.startDate, "YYYYMMDD")
        .diff(moment.utc(b.startDate, "YYYYMMDD"));
    });
  }

  weekClick(event: any, week: Week) {
    this.weekSelectionChange.emit(week);
  }

  constructor() {}

  ngOnInit() {}
}
