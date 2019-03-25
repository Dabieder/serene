import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { DashboardPage } from "../../models/dashboard";
import * as fromDashboard from "../../reducers";
import * as fromApp from "../../../reducers";
import { Observable } from "rxjs";

@Component({
  selector: "[ng-sidebar-pages-menu]",
  templateUrl: "./sidebar-pages-menu.component.html",
  styleUrls: ["./sidebar-pages-menu.component.css"]
})
export class SidebarPagesMenuComponent implements OnInit {
  selectPagesForCourse$: Observable<any> = this.store.pipe(
    select(fromDashboard.selectPagesForCourse)
  );
  selectCurrentCourseId$: Observable<DashboardPage[]> = this.store.pipe(
    select(fromApp.selectCurrentCourseId)
  );

  constructor(private store: Store<fromDashboard.State>) {}

  ngOnInit() {}
}
