import {
  withLatestFrom,
  catchError,
  map,
  tap,
  switchMap
} from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import {
  SrlWidgetActionTypes,
  SelectedWeekChangeAction,
  RequestDataFromBackendAction,
  RequestDataFromBackendSuccessAction,
  RequestDataFromBackendErrorAction,
  SubmitDataToBackendErrorAction,
  SubmitDataToBackendSuccessAction,
  SubmitNewPlanAction,
  SubmitMonitoringAction,
  CompletePlanAction,
  UpdatePlansAction
} from "./srl-widget.actions";
import { of } from "rxjs";
import { Action, Store, select } from "@ngrx/store";
import { ApiService } from "src/app/core/services";
import { SrlWidgetState, getLearningPlans } from ".";
import {
  LocalStorageService,
  STORAGE_KEYS
} from "src/app/core/services/local-storage.service";
import { Week } from "../models/week";

@Injectable()
export class SrlWidgetEffects {
  constructor(
    private actions$: Actions<Action>,
    private store$: Store<SrlWidgetState>,
    private apiService: ApiService
  ) {}

  @Effect()
  public requestBackendData = this.actions$.pipe(
    ofType<RequestDataFromBackendAction>(
      SrlWidgetActionTypes.REQUEST_DATA_FROM_BACKEND
    ),
    switchMap(() => {
      return this.apiService.get("/widgets/srlwidget").pipe(
        map((res: any) => {
          return new RequestDataFromBackendSuccessAction({
            reasons: res.reasons,
            metaSettings: res.metaSettings,
            surveyResults: res.surveyResults,
            learningPlans: res.learningPlans,
            monitorings: res.monitorings
          });
        }),
        catchError(error =>
          of(new RequestDataFromBackendErrorAction({ error }))
        )
      );
    })
  );

  @Effect({ dispatch: false })
  public receivedDataFromBackend = this.actions$.pipe(
    ofType<RequestDataFromBackendSuccessAction>(
      SrlWidgetActionTypes.REQUEST_DATA_FROM_BACKEND_SUCCESS
    ),
    tap(action => {
      LocalStorageService.setItem(
        STORAGE_KEYS.srlReasons,
        action.payload.reasons
      );
      LocalStorageService.setItem(
        STORAGE_KEYS.srlMetaSettings,
        action.payload.metaSettings
      );
    })
  );

  @Effect({ dispatch: false })
  public learningPlansUpdateBackend = this.actions$.pipe(
    ofType<UpdatePlansAction>(SrlWidgetActionTypes.UPDATE_PLANS),
    withLatestFrom(this.store$.pipe(select(getLearningPlans))),
    switchMap(([action, plans]) => {
      return this.apiService
        .post("/widgets/srlwidget/learningplans", plans)
        .pipe(
          map(() => {
            return new SubmitDataToBackendSuccessAction({});
          }),
          catchError(error => of(new SubmitDataToBackendErrorAction({ error })))
        );
    })
  );

  @Effect({ dispatch: false })
  public learningPlanCreatedUpdateBackend = this.actions$.pipe(
    ofType<SubmitNewPlanAction>(SrlWidgetActionTypes.SUBMIT_NEW_PLAN),
    switchMap(action => {
      return this.apiService
        .post("/widgets/srlwidget/learningplans", [action.payload.plan])
        .pipe(
          map(() => {
            return new SubmitDataToBackendSuccessAction({});
          }),
          catchError(error => of(new SubmitDataToBackendErrorAction({ error })))
        );
    })
  );

  @Effect({ dispatch: false })
  public learningPlanDeleteUpdateBackend = this.actions$.pipe(
    ofType<SubmitNewPlanAction>(SrlWidgetActionTypes.DELETE_PLAN),
    switchMap(action => {
      return this.apiService
        .delete(`/widgets/srlwidget/learningplans/${action.payload.plan.id}`)
        .pipe(
          map(() => {
            return new SubmitDataToBackendSuccessAction({});
          }),
          catchError(error => of(new SubmitDataToBackendErrorAction({ error })))
        );
    })
  );

  @Effect({ dispatch: false })
  public learningPlanCompleted = this.actions$.pipe(
    ofType<CompletePlanAction>(SrlWidgetActionTypes.COMPLETE_PLAN),
    switchMap(action => {
      return this.apiService
        .post("/widgets/srlwidget/learningplans/", [action.payload.plan])
        .pipe(
          map(() => {
            return new SubmitDataToBackendSuccessAction({});
          }),
          catchError(error => of(new SubmitDataToBackendErrorAction({ error })))
        );
    })
  );

  @Effect({ dispatch: false })
  public monitoringsUpdateBackend = this.actions$.pipe(
    ofType<SubmitMonitoringAction>(SrlWidgetActionTypes.SUBMIT_MONITORING),
    switchMap(action => {
      return this.apiService
        .post("/widgets/srlwidget/monitorings", [action.payload.monitoring])
        .pipe(
          map(() => {
            return new SubmitDataToBackendSuccessAction({});
          }),
          catchError(error => of(new SubmitDataToBackendErrorAction({ error })))
        );
    })
  );
}
