import { Injectable } from "@angular/core";
import { SwPush } from "@angular/service-worker";
import { HttpClient } from "@angular/common/http";
import { map, catchError, tap } from "rxjs/operators";
import { ENDPOINTS, ApiService } from "./api.service";
import { AppState } from "src/app/reducers";
import { Store } from "@ngrx/store";
import { LoggingService } from "./logging.service";

@Injectable({
  providedIn: "root"
})
export class PushNotificationService {
  readonly VAPID_PUBLIC_KEY =
    "BLm_8CB1vopVOuoH-Sk-V-sbE6OLHpW86czG1DYumOD880MxDgdnA03Dr65635pTAj1-cdTJmv6Lon7VZLPYlhc";

  constructor(
    private swPush: SwPush,
    private http: HttpClient,
    private apiService: ApiService,
    private store$: Store<AppState>,
    private logService: LoggingService
  ) {
    // this.store$.select(isAuthenticated).subscribe(authenticated => {
    //   if (authenticated) {
    //     this.subscribeToPushNotifications();
    //   }
    // });
    // this.handleNotificationClicks();
  }

  handleNotificationClicks() {
    console.log("Subscribing to notification click");
    this.swPush.notificationClicks.subscribe(event => {
      console.log("Notification Click", event);
      if (event.notification.data.url) {
        console.log("Notification Has a data URL", event);
        window.open(event.notification.data.url);
      }
      // this.logService.logNotificationClick(event);
      fetch("/lad-backend/logs/sw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          time: new Date(Date.now()).toUTCString(),
          data: event,
          type: "click:notification"
        })
      }).then(resp => {
        console.log("Fetch post sw logs");
      });
    });

    this.swPush.messages.subscribe(message => {
      console.log("SWPush message receive", message);
    });
  }

  // TODO: Refactor and add error handling
  subscribeToPushNotifications() {
    if (!("serviceWorker" in navigator)) {
      console.log("Service Worker not supported");
      // Service Worker isn't supported on this browser, disable or hide UI.
      return;
    }
    if (!("PushManager" in window)) {
      console.log("Push Manager not supported");
      // Push isn't supported on this browser, disable or hide UI.
      return;
    }

    if (this.swPush.isEnabled) {
      console.log("swpush is enabled");
      this.swPush
        .requestSubscription({
          serverPublicKey: this.VAPID_PUBLIC_KEY
        })
        .then(subscription => {
          console.log("Subscription: ", subscription);
          this.apiService
            .post(ENDPOINTS.REGISTER_NOTIFICATIONS, subscription)
            .pipe(
              tap(res => {
                console.log("Received Response to subscribe to notifications");
              })
            )
            .subscribe();
        })
        .catch(err => {
          console.log("Request subscription error: ", err);
        });
    } else {
      console.log("SW push is not enabled");
    }
  }

  handleNotifications() {
    Notification.requestPermission(status => {
      console.log("Permission status: ", status);
    });
  }
}
