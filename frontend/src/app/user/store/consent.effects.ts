import {
  switchMap,
  map,
  catchError,
  tap,
  withLatestFrom
} from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Action, Store, select } from "@ngrx/store";
import { of, Observable } from "rxjs";
import {
  UserActionTypes,
  ConsentSubmitAction,
  ConsentSubmitErrorAction,
  ConsentSubmitSuccessAction,
  ConsentRetrieveSuccessAction,
  ConsentRetrieveErrorAction
} from "./user.actions";
import { Router } from "@angular/router";
import { ConsentService } from "../../settings/services/consent.service";
import { AppState, getAuthenticatedUser, getSettings } from "src/app/reducers";
import { ApiService, ENDPOINTS } from "src/app/core/services";
import { FetchSettingsAction } from "src/app/settings/store/settings.action";
import { MatDialog } from "@angular/material/dialog";
import { InitialSettingsDialogComponent } from "src/app/shared/dialogs/initial-settings-dialog.component";
import { Settings } from "src/app/settings/models/settings";

@Injectable()
export class ConsentEffects {
  constructor(
    public dialog: MatDialog,
    private actions: Actions,
    private consentService: ConsentService,
    private router: Router,
    private store$: Store<AppState>,
    private apiService: ApiService
  ) {}

  @Effect()
  public consentSubmitted: Observable<Action> = this.actions.pipe(
    ofType<ConsentSubmitAction>(UserActionTypes.CONSENT_SUBMIT),
    switchMap(action => {
      return this.apiService
        .post(ENDPOINTS.CONSENT, action.payload.consent)
        .pipe(
          map((response: any) => {
            return new ConsentSubmitSuccessAction({
              consent: action.payload.consent
            });
          }),
          catchError(error =>
            of(new ConsentSubmitErrorAction({ error: error }))
          )
        );
    })
  );

  @Effect({ dispatch: false })
  public consentSubmitSuccess: Observable<Action> = this.actions.pipe(
    ofType(UserActionTypes.CONSENT_SUBMIT_SUCCESS),
    withLatestFrom(this.store$.pipe(select(getSettings))),
    map(([action, state]: [ConsentSubmitSuccessAction, Settings]) => {
      this.router.navigate(["/serene/plan"], {
        queryParams: { fs: false }
      });
      this.showInitialSettingsDialog();
      return action;
    })
  );

  @Effect()
  public consentRetrieve: Observable<Action> = this.actions.pipe(
    ofType(UserActionTypes.CONSENT_RETRIEVE),
    switchMap(() => {
      // TODO: REMOVE DEBUG COURSE
      const courseId = "5bbf3ed292b8de2f5483e13f";
      return this.consentService
        .getConsent(courseId)
        .pipe(
          map(consent => new ConsentRetrieveSuccessAction({ consent: consent }))
        );
    }),
    catchError(error => of(new ConsentRetrieveErrorAction({ error })))
  );

  @Effect({ dispatch: false })
  public consentRetrieveSuccess: Observable<Action> = this.actions.pipe(
    ofType(UserActionTypes.CONSENT_RETRIEVE_SUCCESS),
    withLatestFrom(this.store$.pipe(select(state => state))),
    map(([action, state]: [ConsentRetrieveSuccessAction, any]) => {
      return action;
    })
  );

  public navigateToFullscreenConsent = (courseId: string) => {
    this.router.navigate(["/user/consent/" + courseId], {
      queryParams: { fs: true }
    });
  };

  showInitialSettingsDialog() {
    const dialogRef = this.dialog.open(InitialSettingsDialogComponent, {
      disableClose: true,
      autoFocus: true,
      width: "500px",
      maxWidth: window.innerWidth,
      data: {
        surveyCode: "",
        usePushNotifications: false,
        useEmailNotifications: false,
        email: ""
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });
  }
}
