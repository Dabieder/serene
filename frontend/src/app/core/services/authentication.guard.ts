import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { AppState, isAuthenticated, getUser } from "../../reducers";
import {
  TokenSessionLoginAction,
  AuthenticationRedirectAction
} from "src/app/user/store/auth.actions";
import { LocalStorageService, STORAGE_KEYS } from "./local-storage.service";
import { RouteService } from "./route.service";
import { User } from "src/app/user/models/user";
import { withLatestFrom, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthenticationGuard implements CanActivate {
  user: User;
  constructor(
    private store$: Store<AppState>,
    private router: Router,
    private routeService: RouteService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> {
    const obs = this.store$.select(isAuthenticated);
    console.log("AUTH GUARD!");
    return this.store$.pipe(
      select(isAuthenticated),
      withLatestFrom(this.store$.select(getUser)),
      map(([authed, user]) => {
        if (authed) {
          return true;
        } else {
          const jwt = LocalStorageService.getItem(STORAGE_KEYS.jwt);
          if (jwt) {
            this.store$.dispatch(new TokenSessionLoginAction());
          } else {
            this.store$.dispatch(new AuthenticationRedirectAction());
          }
          return false;
        }
        return false;
      })
    );

    obs.subscribe(authenticated => {
      this.routeService.lastIntendedRoute = state.url;
      if (!authenticated) {
        const jwt = LocalStorageService.getItem(STORAGE_KEYS.jwt);
        if (jwt) {
          this.store$.dispatch(new TokenSessionLoginAction());
        } else {
          this.store$.dispatch(new AuthenticationRedirectAction());
        }
      }
    });

    return obs;
  }
}
