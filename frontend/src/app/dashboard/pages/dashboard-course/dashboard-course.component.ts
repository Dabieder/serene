import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import * as fromDashboard from "../../reducers";
import * as fromApp from "../../../reducers";
import { Observable } from "rxjs";

@Component({
  selector: "app-dashboard-course",
  templateUrl: "./dashboard-course.component.html",
  styleUrls: ["./dashboard-course.component.css"]
})
export class DashboardCourseComponent implements OnInit {
  courseId$: Observable<any> = this.store.pipe(
    select(fromApp.selectCurrentCourseId)
  );

  constructor(private store: Store<fromDashboard.State>) {}

  ngOnInit() {}
}
