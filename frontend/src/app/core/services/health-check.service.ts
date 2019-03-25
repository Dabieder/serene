import { Injectable } from "@angular/core";
import { HealthCheck } from "src/app/shared/models/health-check";
import { CoreState } from "../reducers/core.reducer";
import { Store } from "@ngrx/store";
import { interval } from "rxjs";
import { HealthCheckAction } from "../actions/health-check.actions";

@Injectable({
  providedIn: "root"
})
export class HealthCheckService {
  interval = 10000;

  constructor(private store$: Store<CoreState>) {
    interval(this.interval).subscribe(x => {
      this.performHealthCheck();
    });
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
