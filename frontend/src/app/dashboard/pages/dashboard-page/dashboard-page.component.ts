import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { DashboardPage } from "../../models/dashboard";
import * as fromDashboard from "../../reducers";
import { Observable } from "rxjs";

@Component({
  selector: "ng-dashboard-page",
  templateUrl: "./dashboard-page.component.html",

  styleUrls: ["./dashboard-page.component.css"]
})
export class DashboardPageComponent implements OnInit {
  currentPage$: Observable<DashboardPage> = this.store.pipe(
    select(fromDashboard.currentPageNew)
  );

  // getDashboardPages$: Observable<any> = this.store.select(
  //   fromDashboard.getAllResult
  // );
  constructor(private store: Store<fromDashboard.State>) {}

  ngOnInit() {}
}
