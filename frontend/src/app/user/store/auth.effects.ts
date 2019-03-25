import { map, switchMap, catchError, tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
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
import { ConsentRetrieveAction } from "./user.actions";
import { RouteService } from "src/app/core/services/route.service";
import { FetchSettingsAction } from "src/app/settings/store/settings.action";

@Injectable()
export class AuthEffects {
  constructor(
    private actions: Actions,
    private userService: UserService,
    private router: Router,
    private apiService: ApiService,
    private authService: AuthenticationService,
    private jwtService: JwtService,
    private routeService: RouteService
  ) {}

  @Effect()
  public authenticate: Observable<Action> = this.actions.pipe(
    ofType<AuthenticateAction>(AuthActionTypes.AUTHENTICATE),
    switchMap(action => {
      return this.apiService
        .post("/auth/signin", {
          accountName: action.payload.accountName,
          password: action.payload.password
        })
        .pipe(
          map(data => {
            if (data.user) {
              return new AuthenticationSuccessAction({ user: data.user });
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
        map(user => {
          if (user) {
            return new AuthenticationSuccessAction({ user: user });
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
      this.navigateToOriginallyIntendedRoute();
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
    if (this.router.url.includes("/user/signin")) {
      this.router.navigate(["/user/signin"], {
        queryParams: { fs: true, wp: "1" }
      });
    } else {
      this.router.navigate(["/user/signin"], { queryParams: { fs: true } });
    }
  }

  private navigateToOriginallyIntendedRoute() {
    if (this.routeService.lastIntendedRoute) {
      this.router.navigate([this.routeService.lastIntendedRoute]);
    } else {
      this.router.navigate(["/serene/monitor"]);
    }
  }
}
