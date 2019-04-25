import { Component, OnInit, HostListener } from "@angular/core";
import { Store, select } from "@ngrx/store";
import {
  AppState,
  getShowToolbar,
  getIsAuthenticated,
  isLoading,
  getIsSubmitting
} from "./reducers";
import { Observable } from "rxjs";
import { HideSidenavAction } from "./core/actions/layout.actions";
import * as moment from "moment";
import { BaseComponent } from "./core/base-component";
import { MatDialog } from "@angular/material";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent extends BaseComponent implements OnInit {
  showToolbar$: Observable<boolean> = this.store$.pipe(select(getShowToolbar));
  isAuthenticated$: Observable<boolean> = this.store$.pipe(
    select(getIsAuthenticated)
  );
  loading$ = this.store$.pipe(select(isLoading));
  submitting$ = this.store$.pipe(select(getIsSubmitting));
  
  constructor(public dialog: MatDialog, private store$: Store<AppState>) {
    super();
    this.initMoment();
  }

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    if (window.innerWidth < 992) {
      this.store$.dispatch(new HideSidenavAction());
    }
  }

  ngOnInit() {}

  initMoment() {
    moment.locale("de");
  }
}
