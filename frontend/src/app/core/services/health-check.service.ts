import { Injectable } from "@angular/core";
import { HealthCheck } from "src/app/shared/models/health-check";
import { CoreState } from "../reducers/core.reducer";
import { Store } from "@ngrx/store";
import { interval, Observable, Subject, Observer } from "rxjs";
import { HealthCheckAction } from "../actions/health-check.actions";

@Injectable({
  providedIn: "root"
})
export class HealthCheckService {
  interval = 10000;

  constructor(private store$: Store<CoreState>) {
    // TODO: Reactivate health check
    // interval(this.interval).subscribe(x => {
    //   this.performHealthCheck();
    // });
    // const socket = this.websocketHealthCheck();
    // socket.subscribe(m => {
    //   console.log("Websocket Message: ", m);
    // });
  }

  websocketHealthCheck() {
    const socket = new WebSocket("wss://echo.websocket.org");
    const observable = new Observable((obs: Observer<MessageEvent>) => {
      socket.onmessage = obs.next.bind(observer);
      socket.onerror = obs.error.bind(observer);
      socket.onclose = obs.complete.bind(observer);
      return socket.close.bind(socket);
    });
    const observer = {
      next: (data: Object) => {
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify(data));
        }
      }
    };
    return Subject.create(observer, observable);
  }

  performHealthCheck() {
    this.store$.dispatch(new HealthCheckAction());
  }

  healthFromBackendResponse(response: any): HealthCheck {
    if (response.base.status) {
      return {
        connected: true,
        message: ""
      };
    } else {
      return {
        connected: true,
        message: "The server could not be reached"
      };
    }
  }
}
