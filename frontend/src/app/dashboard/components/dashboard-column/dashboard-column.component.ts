import { Component, OnInit, Input } from "@angular/core";
import { DashboardPageColumn } from "../../models/dashboard";
import { Store } from "@ngrx/store";
import * as fromDashboard from "../../reducers";
import * as QueryActions from "../../actions/query.actions";
import { ICardOptions } from "src/app/shared/components/card.component";

@Component({
  selector: "ng-dashboard-column",
  templateUrl: "./dashboard-column.component.html",
  styleUrls: ["./dashboard-column.component.css"]
})
export class DashboardColumnComponent implements OnInit {
  @Input()
  column: DashboardPageColumn;
  public cardOptionsCloseMe: ICardOptions;
  public cardOptionsNewProject: ICardOptions;

  vizId = "ngx-gauge";

  data = [
    { data: [65, 59, 90, 81, 56, 55, 40], label: "Series A" },
    { data: [28, 48, 40, 19, 96, 27, 100], label: "Series B" }
  ];

  constructor(private store: Store<fromDashboard.State>) {
    this.cardOptionsCloseMe = {
      button: [{ icon: { fa: true, "fa-times": true } }]
    };
    this.cardOptionsNewProject = { button: [] };
  }

  ngOnInit() {
    this.store.dispatch(new QueryActions.Query({ queryId: "queryId" }));
  }

  clickHeaderButton(val) {
    // console.log("Clicked "+val.id)
  }
}
