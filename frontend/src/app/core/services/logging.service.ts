import { Injectable } from "@angular/core";
import { ScrollLogger } from "src/app/logging/scroll-logger";
import { ClickLogger } from "src/app/logging/click-logger";
import { ApiService } from "./api.service";
import { interval } from "rxjs";
import { map, tap } from "rxjs/operators";
import { AppState } from "src/app/reducers";
import { Store } from "@ngrx/store";
import { AuthenticationService } from "./authentication.service";

@Injectable({
  providedIn: "root"
})
export class LoggingService {
  scrollLogger: ScrollLogger;
  clickLogger: ClickLogger;
  log = [];
  private timestamp: Date;

  constructor(
    private apiService: ApiService,
    private authService: AuthenticationService
  ) {
    this.scrollLogger = new ScrollLogger();
    this.clickLogger = new ClickLogger();
    this.timestamp = new Date(Date.now());

    interval(20000).subscribe(x => {
      this.submitLogs();
    });
  }

  private getTimestamp() {
    return this.timestamp.toUTCString();
  }

  public logNotificationClick(notification: any) {
    this.logWhatever(notification, "notificationInteraction");
  }

  public logNavigation(navigation: any) {
    this.logWhatever(navigation, "navigation");
  }

  public logEvent(thing: any) {
    this.logWhatever(thing, "event");
  }

  public logError(thing: any) {
    this.logWhatever(thing, "error");
  }

  private logWhatever(thing: any, type: string) {
    this.log.push({
      time: this.getTimestamp(),
      data: thing,
      type: type
    });
  }

  public submitLogs() {
    if (this.authService.isLoggedIn) {
      if (this.log.length > 0) {
        this.apiService
          .post("/logs", this.log)
          .pipe(
            tap(response => {
              if (!response.error) {
                this.log = [];
              }
            })
          )
          .subscribe();
      }
    }
  }

  public startScrollLogging(tagName = "") {
    this.logEvent("Scroll Log Start " + tagName);
    this.scrollLogger.startLogging();
  }

  public stopScrollLogging(tagName = "") {
    this.logEvent("Scroll Log End " + tagName);
  }

  public startClickLogging() {
    this.clickLogger.startLogging();
  }

  public getLog() {
    return {
      scroll: this.scrollLogger.getLog()
    };
  }
}
