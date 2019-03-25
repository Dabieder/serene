import { Component, OnInit, Output, Input, EventEmitter } from "@angular/core";
import { RatingItem, IRatingItem } from "../../models/rating-item";
import { Monitoring } from "../../models/monitoring";
import { SrlWidgetState, getReasons } from "../../store";
import { Store, select } from "@ngrx/store";
import { takeUntil } from "rxjs/operators";
import { BaseComponent } from "src/app/core/base-component";

interface ReasonListDisplayObject {
  icon: string;
  name: string;
  label: string;
  count: number;
}

@Component({
  selector: "app-reason-overview",
  templateUrl: "./reason-overview.component.html",
  styleUrls: ["./reason-overview.component.scss"]
})
export class ReasonOverviewComponent extends BaseComponent implements OnInit {
  private _monitorings: Monitoring[];
  reasonsPositive: ReasonListDisplayObject[] = [];
  reasonsNegative: ReasonListDisplayObject[] = [];
  reasons: { [name: string]: RatingItem } = {};
  @Input("monitorings")
  set monitorings(monitorings: Monitoring[]) {
    this._monitorings = monitorings;
  }

  get monitorings() {
    return this._monitorings;
  }

  sortListsByCount() {
    this.reasonsNegative.sort((a, b) => {
      return b.count - a.count;
    });
    this.reasonsPositive.sort((a, b) => {
      return b.count - a.count;
    });
  }

  checkForReasonInReasonList(
    list: ReasonListDisplayObject[],
    reason: IRatingItem
  ) {
    const indexOf = list.findIndex(x => x.name === reason.name);
    if (indexOf === -1) {
      if (reason.rating > 0) {
        list.push({
          icon: this.reasons[reason.name].icon,
          name: `${reason.name}`,
          label: `${this.reasons[reason.name].labelHelped} ${reason.name}`,
          count: 1
        });
      }
      if (reason.rating < 0) {
        list.push({
          icon: this.reasons[reason.name].icon,
          name: `${reason.name}`,
          label: `${this.reasons[reason.name].labelHindered} ${reason.name}`,
          count: 1
        });
      }
    } else {
      list[indexOf].count += 1;
    }
  }

  constructor(private store$: Store<SrlWidgetState>) {
    super();
  }

  ngOnInit() {
    this.store$
      .pipe(
        select(getReasons),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((reasons: RatingItem[]) => {
        if (reasons) {
          for (const reason of reasons) {
            this.reasons[reason.name] = reason;
          }
        }

        this.reasonsPositive = [];
        this.reasonsNegative = [];
        for (const monitor of this.monitorings) {
          for (const reason of monitor.reasons) {
            if (reason.rating > 0) {
              this.checkForReasonInReasonList(this.reasonsPositive, reason);
            }
            if (reason.rating < 0) {
              this.checkForReasonInReasonList(this.reasonsNegative, reason);
            }
          }
        }

        this.sortListsByCount();
      });
  }
}
