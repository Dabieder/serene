import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { BaseComponent } from "src/app/core/base-component";
import { Week } from "../models/week";
import * as moment from "moment";
import { LoggingService } from "src/app/core/services/logging.service";

@Component({
  selector: "app-week-selection",
  templateUrl: "./week-selection.component.html",
  styleUrls: ["./week-selection.component.scss"]
})
export class WeekSelectionComponent extends BaseComponent implements OnInit {
  selectedWeekDisplay = "01.11.18 - 07.11.18";
  showOverview: boolean;
  @Input()
  selectedWeek: Week;
  @Output()
  weekSelectionChange: EventEmitter<Week> = new EventEmitter();
  @Input()
  minWeek: Week = new Week(moment("20181016", "YYYYMMDD").toDate());
  @Input()
  maxWeek: Week = new Week(moment("20190212", "YYYYMMDD").toDate());
  constructor(private loggingService: LoggingService) {
    super();
  }

  ngOnInit() {}

  onSelectedWeekChange(week: Week) {
    this.weekSelectionChange.emit(week);
  }

  selectNextWeek() {
    const nextWeekDate = moment(this.selectedWeek.startDate)
      .add(7, "days")
      .toDate();
    const nextWeek = new Week(nextWeekDate);
    this.weekSelectionChange.emit(nextWeek);
    this.loggingService.logEvent("[Week Selection] Select Next Week");
  }

  selectPreviousWeek() {
    const previousWeekDate = moment(this.selectedWeek.startDate)
      .subtract(7, "days")
      .toDate();
    const previousWeek = new Week(previousWeekDate);
    this.weekSelectionChange.emit(previousWeek);
    this.loggingService.logEvent("[Week Selection] Select Previous Week");
  }

  weekSelectionClick(event: any) {
    this.showOverview = !this.showOverview;
  }
}
