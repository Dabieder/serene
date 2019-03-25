import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState, isAuthenticated } from "../../reducers";
import {
  TokenSessionLoginAction,
  AuthenticationRedirectAction
} from "src/app/user/store/auth.actions";
import { LocalStorageService, STORAGE_KEYS } from "./local-storage.service";
import { RouteService } from "./route.service";

@Injectable({
  providedIn: "root"
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private routeService: RouteService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> {
    const obs = this.store.select(isAuthenticated);

    obs.subscribe(authenticated => {
      this.routeService.lastIntendedRoute = state.url;
      if (!authenticated) {
        const jwt = LocalStorageService.getItem(STORAGE_KEYS.jwt);
        if (jwt) {
          this.store.dispatch(new TokenSessionLoginAction());
        } else {
          this.store.dispatch(new AuthenticationRedirectAction());
        }
      }
    });

    return obs;
  }
}
