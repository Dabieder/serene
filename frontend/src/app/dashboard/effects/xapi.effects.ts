import { map, withLatestFrom, catchError, switchMap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { Action, select } from "@ngrx/store";
import * as XapiActions from "../actions/xapi.actions";
import { XApiService } from "../../core/services/x-api.service";
import { Store } from "@ngrx/store";
import * as fromApp from "../reducers";
import { HttpErrorResponse } from "@angular/common/http";
@Injectable()
export class XapiEffects {
  @Effect()
  post$: Observable<Action> = this.actions$.pipe(
    ofType(XapiActions.XapiActionTypes.SubmitXapi),
    withLatestFrom(this.store.pipe(select(state => state.user))),
    switchMap(([action, userstate]: [XapiActions.SubmitXapi, any]) => {
      if (userstate.user) {
        action.payload.actor = {
          accountName: userstate.user.accountName
        };
        return this.xapiService.submitStatement(action.payload).pipe(
          map(resp => new XapiActions.SubmitXapiSuccess()),
          catchError((err: HttpErrorResponse) => {
            return of(
              new XapiActions.SubmitXapiError({
                error: `Error submitting xAPI Statements: ${err.message}`
              })
            );
          })
        );
      }
      return of(
        new XapiActions.SubmitXapiError({
          error: `No user provided for the xAPI statement`
        })
      );
    })
  );

  @Effect({ dispatch: false })
  error$ = this.actions$.pipe(
    ofType(XapiActions.XapiActionTypes.SubmitXapiError),
    switchMap((action: XapiActions.SubmitXapiError) => {
      console.log(`error submitting xapi statement ${action.payload.error}`);

      return of({ type: "noop" });
    })
  );

  constructor(
    private actions$: Actions,
    private xapiService: XApiService,
    private store: Store<fromApp.State>
  ) {}
}
