import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Store } from "@ngrx/store";
import * as fromDashboard from "../../reducers";
import * as DashboardActions from "../actions/dashboard.actions";

@Injectable()
export class CourseResolver implements Resolve<void> {
  constructor(private store: Store<fromDashboard.AppState>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.store.dispatch(
      new DashboardActions.DPLoad({ courseId: route.params.courseId })
    );
    // new DashboardActions.DRLoad({courseId:route.params.courseId,pageId:route.params.pageId}));
  }
}
