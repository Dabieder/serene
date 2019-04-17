import { map, switchMap, catchError, tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { of, Observable } from "rxjs";
import { UserService } from "../../core/services/user.service";
import {
  AuthActionTypes,
  AuthenticationSuccessAction,
  AuthenticationErrorAction,
  SignOutSuccessAction,
  SignoutErrorAction,
  TokenSessionLoginAction,
  AuthenticationRedirectAction,
  AuthenticateThirdPartyAction,
  AuthenticateAction
} from "./auth.actions";
import { Router } from "@angular/router";
import { ApiService, JwtService, ENDPOINTS } from "../../core/services";
import { AuthenticationService } from "../../core/services/authentication.service";
import { RouteService } from "src/app/core/services/route.service";
import { FetchSettingsAction } from "src/app/settings/store/settings.action";
import { AppState } from "src/app/reducers";
import { HideToolbarAction } from "src/app/core/actions/layout.actions";

@Injectable()
export class AuthEffects {
  constructor(
    private actions: Actions,
    private userService: UserService,
    private router: Router,
    private apiService: ApiService,
    private authService: AuthenticationService,
    private jwtService: JwtService,
    private routeService: RouteService,
    private store$: Store<AppState>
  ) {}

  @Effect()
  public authenticate: Observable<Action> = this.actions.pipe(
    ofType<AuthenticateAction>(AuthActionTypes.AUTHENTICATE),
    switchMap(action => {
      return this.apiService
        .post(ENDPOINTS.SIGN_IN, {
          accountName: action.payload.accountName,
          password: action.payload.password
        })
        .pipe(
          map(response => {
            if (response.data) {
              return new AuthenticationSuccessAction({ user: response.data });
            } else {
              return new AuthenticationErrorAction();
            }
          }),
          catchError(error => {
            return of(new AuthenticationErrorAction({ error: error }));
          })
        );
    })
  );

  @Effect()
  public tokenLogin: Observable<Action> = this.actions.pipe(
    ofType<TokenSessionLoginAction>(AuthActionTypes.TOKEN_SESSION_LOGIN),
    switchMap(() => {
      return this.apiService.get(ENDPOINTS.USER).pipe(
        map((response: any) => {
          if (response.data) {
            return new AuthenticationSuccessAction({ user: response.data });
          } else {
            return new AuthenticationRedirectAction();
          }
        }),
        catchError(error => {
          return of(new AuthenticationErrorAction({ error: error }));
        })
      );
    })
  );

  @Effect()
  public signOut: Observable<Action> = this.actions.pipe(
    ofType(AuthActionTypes.SIGN_OUT),
    switchMap(() => {
      return this.userService.signOut().pipe(
        map(() => new SignOutSuccessAction()),
        catchError(error => of(new SignoutErrorAction({ error: error })))
      );
    })
  );

  @Effect({ dispatch: false })
  public signOutSuccess: Observable<Action> = this.actions.pipe(
    ofType(AuthActionTypes.SIGN_OUT_SUCCESS),
    tap(() => {
      this.jwtService.destroyToken();
      this.navigateFullScreenSignIn();
    })
  );

  @Effect({ dispatch: false })
  public authenticationError: Observable<Action> = this.actions.pipe(
    ofType(AuthActionTypes.AUTHENTICATION_ERROR),
    map((action: AuthenticationErrorAction) => action.payload),
    tap(payload => {
      if (payload.error) {
        if (payload.error.status >= 400 && payload.error.status <= 404) {
          this.navigateFullScreenSignIn();
        }
      }
    })
  );

  @Effect()
  public authenticatedSuccess = this.actions.pipe(
    ofType(AuthActionTypes.AUTHENTICATION_SUCCESS),
    tap((action: AuthenticationSuccessAction) => {
      if (action.payload.user.token) {
        this.jwtService.saveToken(action.payload.user.token);
      }
      if (action.payload.user.consented) {
        this.navigateToOriginallyIntendedRoute();
      } else {
        this.navigateToConsentForm();
      }
    }),
    map(() => {
      return new FetchSettingsAction();
    })
  );

  @Effect({ dispatch: false })
  public authenticationRedirect = this.actions.pipe(
    ofType(AuthActionTypes.AUTHENTICATION_REDIRECT),
    tap(() => {
      this.navigateFullScreenSignIn();
    })
  );

  @Effect({ dispatch: false })
  public authenticateThirdParty: Observable<Action> = this.actions.pipe(
    ofType<AuthenticateThirdPartyAction>(
      AuthActionTypes.AUTHENTICATE_THIRD_PARTY
    ),
    tap((action: AuthenticateThirdPartyAction) => {
      this.authService.thirdPartyLogin(action.payload.serviceName);
    })
  );

  private navigateFullScreenSignIn() {
    if (this.router.url.includes("/signin")) {
      this.router.navigate(["/signin"], {
        queryParams: { fs: true, wp: "1" }
      });
    } else {
      this.router.navigate(["/signin"], { queryParams: { fs: true } });
    }
  }

  private navigateToOriginallyIntendedRoute() {
    if (this.routeService.lastIntendedRoute) {
      this.router.navigate([this.routeService.lastIntendedRoute]);
    } else {
      this.router.navigate(["/serene/monitor"]);
    }
  }

  private navigateToConsentForm() {
    this.store$.dispatch(new HideToolbarAction());
    this.router.navigate(["/consent"]);
  }
}
