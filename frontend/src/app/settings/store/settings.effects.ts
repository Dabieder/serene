import { Action, Store, select } from "@ngrx/store";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { ApiService, ENDPOINTS } from "src/app/core/services";
import {
  SettingsActionTypes,
  SubmitSettingsSuccessAction,
  SubmitSettingsErrorAction,
  SubmitSettingsAction,
  FetchSettingsAction,
  FetchSettingsErrorAction,
  FetchSettingsSuccessAction
} from "./settings.action";
import { switchMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs";
import { Settings } from "../models/settings";

@Injectable()
export class SettingsEffects {
  constructor(
    private actions$: Actions<Action>,
    private store$: Store<Settings>,
    private apiService: ApiService
  ) {}

  @Effect({ dispatch: false })
  public submitSettings = this.actions$.pipe(
    ofType<SubmitSettingsAction>(SettingsActionTypes.SUBMIT_SETTINGS),
    switchMap(action => {
      return this.apiService
        .post(ENDPOINTS.SETTINGS, action.payload.settings)
        .pipe(
          map((res: any) => {
            return new SubmitSettingsSuccessAction();
          }),
          catchError(error => {
            return of(new SubmitSettingsErrorAction({ error }));
          })
        );
    })
  );

  @Effect()
  public fetchSettings = this.actions$.pipe(
    ofType<FetchSettingsAction>(SettingsActionTypes.FETCH_SETTINGS),
    switchMap(action => {
      return this.apiService.get(ENDPOINTS.SETTINGS, action.payload).pipe(
        map((response: any) => {
          return new FetchSettingsSuccessAction({
            settings: response.settings
          });
        }),
        catchError(error => {
          return of(new FetchSettingsErrorAction({ error }));
        })
      );
    })
  );
}
