import { Component, OnInit, HostListener } from "@angular/core";
import { Store, select } from "@ngrx/store";
import {
  AppState,
  getShowToolbar,
  getIsAuthenticated,
  getSettingsState,
  getSettings,
  isLoading,
  getIsSubmitting
} from "./reducers";
import { Observable } from "rxjs";
import { HideSidenavAction } from "./core/actions/layout.actions";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import * as moment from "moment";
import { LoggingService } from "./core/services/logging.service";
import { PushNotificationService } from "./core/services/push-notification.service";
import { BaseComponent } from "./core/base-component";
import { MatDialog } from "@angular/material";
import { InitialSettingsDialogComponent } from "./shared/dialogs/initial-settings-dialog.component";

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
  constructor(
    public dialog: MatDialog,
    private store$: Store<AppState>,
    private router: Router,
    private loggingServe: LoggingService
  ) {
    super();
    this.initMoment();

    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.loggingServe.logNavigation(val.url);
      }
    });

    // this.store$.pipe(select(getSettingsState)).subscribe(settings => {
    //   if (settings) {
    //     if (settings.settings.usePushNotifications) {
    //       pushService.subscribeToPushNotifications();
    //     }
    //   }
    // });
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
