import { Component, OnInit, HostListener } from "@angular/core";
import { Store, select } from "@ngrx/store";
import {
  AppState,
  getShowToolbar,
  getIsAuthenticated,
  isLoading,
  getIsSubmitting,
  getSettings
} from "./reducers";
import { Observable } from "rxjs";
import { HideSidenavAction } from "./core/actions/layout.actions";
import * as moment from "moment";
import { BaseComponent } from "./core/base-component";
import { MatDialog } from "@angular/material/dialog";
import { map } from "rxjs/operators";
import { PushNotificationService } from "./core/services/push-notification.service";

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
    private pushNotificationService: PushNotificationService
  ) {
    super();
    this.initMoment();
  }

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    if (window.innerWidth < 992) {
      this.store$.dispatch(new HideSidenavAction());
    }
  }

  ngOnInit() {
    this.store$
      .select(getSettings)
      .pipe(
        map(settings => settings.usePushNotifications),
        map(usePush => {
          if (usePush) {
            this.pushNotificationService.subscribeToPushNotifications();
          }
        })
      )
      .subscribe();

    document.querySelectorAll("img.svg").forEach(function(element) {
      const imgID = element.getAttribute("id");
      const imgClass = element.getAttribute("class");
      const imgURL = element.getAttribute("src");

      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          const svg = xhr.responseXML.getElementsByTagName("svg")[0];

          if (imgID != null) {
            svg.setAttribute("id", imgID);
          }

          if (imgClass != null) {
            svg.setAttribute("class", imgClass + " replaced-svg");
          }

          svg.removeAttribute("xmlns:a");

          if (
            !svg.hasAttribute("viewBox") &&
            svg.hasAttribute("height") &&
            svg.hasAttribute("width")
          ) {
            svg.setAttribute(
              "viewBox",
              "0 0 " +
                svg.getAttribute("height") +
                " " +
                svg.getAttribute("width")
            );
          }
          element.parentElement.replaceChild(svg, element);
        }
      };
      xhr.open("GET", imgURL, true);
      xhr.send(null);
    });
  }

  initMoment() {
    moment.locale("de");
  }
}
