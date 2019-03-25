import { Injectable } from "@angular/core";
import { SwPush } from "@angular/service-worker";
import { HttpClient } from "@angular/common/http";
import { map, catchError, tap } from "rxjs/operators";
import { ENDPOINTS, ApiService } from "./api.service";
import { AppState, isAuthenticated } from "src/app/reducers";
import { Store } from "@ngrx/store";

@Injectable({
  providedIn: "root"
})
export class PushNotificationService {
  readonly VAPID_PUBLIC_KEY =
    "BIQIGNzNmqgaO6JU4-vxtCRiTWC2-gVP_dW1yvwGh8KxLeiGWhXiW8y0ibaof4TtfBowL4Pw0jzI6aK6Hq963Jw";

  constructor(
    private swPush: SwPush,
    private http: HttpClient,
    private apiService: ApiService,
    private store$: Store<AppState>
  ) {
    this.store$.select(isAuthenticated).subscribe(authenticated => {
      if (authenticated) {
        this.subscribeToPushNotifications();
      }
    });
  }

  handleNotificationClicks() {
    this.swPush.notificationClicks.subscribe(value => {
      console.log("Notification Click", value);
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

  notificationTest() {
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      alert("This browser does not support system notifications");
    } else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      const notification = new Notification("Hi there!");
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission(function(permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          const notification = new Notification("Hi there!");
        }
      });
    }
  }
}
