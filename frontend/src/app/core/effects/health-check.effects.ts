import { Injectable } from "@angular/core";
import { ApiService, ENDPOINTS } from "../services";
import { HealthCheckService } from "../services/health-check.service";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { Action } from "@ngrx/store";
import {
  HealthActionTypes,
  HealthCheckAction,
  HealthCheckSuccessAction,
  HealthCheckErrorAction
} from "../actions/health-check.actions";
import { switchMap, map, catchError } from "rxjs/operators";
import { ShowAlertAction, HideAlertAction } from "../actions/alerts.actions";
import { ALERTS } from "src/app/shared/models/alert";

@Injectable()
export class HealthCheckEffects {
  constructor(
    private actions: Actions,
    private apiService: ApiService,
    private healthCheckService: HealthCheckService
  ) {}

  @Effect()
  public healthCheck: Observable<Action> = this.actions.pipe(
    ofType<HealthCheckAction>(HealthActionTypes.HEALTH_CHECK),
    switchMap(action => {
      return this.apiService.get(ENDPOINTS.HEALTH).pipe(
        map(data => {
          const healthCheck = this.healthCheckService.healthFromBackendResponse(
            data
          );
          if (healthCheck.connected) {
            return new HealthCheckSuccessAction();
          } else {
            return new HealthCheckErrorAction({ healthCheck });
          }
        }),
        catchError(error => {
          const healthCheck = {
            connected: false,
            message: "Error trying to reach the server"
          };
          return of(new HealthCheckErrorAction({ healthCheck }));
        })
      );
    })
  );

  @Effect()
  public healthCheckError: Observable<Action> = this.actions.pipe(
    ofType<HealthCheckErrorAction>(HealthActionTypes.HEALTH_CHECK_ERROR),
    map(action => {
      return new ShowAlertAction({
        alert: ALERTS.SERVER_CONNECTION_ERROR
      });
    })
  );

  @Effect()
  public healthCheckSuccess: Observable<Action> = this.actions.pipe(
    ofType<HealthCheckSuccessAction>(HealthActionTypes.HEALTH_CHECK_SUCCESS),
    map(action => {
      return new HideAlertAction({
        alert: ALERTS.SERVER_CONNECTION_ERROR
      });
    })
  );
}
