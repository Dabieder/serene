import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { ApiService } from ".";
import { JwtService } from "./jwt.service";
import { Store, select } from "@ngrx/store";
import { AppState, getAuthenticatedUser } from "../../reducers";
import { AuthenticationSuccessAction } from "src/app/user/store/auth.actions";

export const enum AuthProviders {
  CAS = "CAS"
}

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  isLoggedIn = false;
  bearer: string;
  serviceUrl: string;
  casValidateUrl = "/auth/casvalidate";

  constructor(
    private jwtService: JwtService,
    private apiService: ApiService,
    private store$: Store<AppState>
  ) {
    const m = window.location.href.match(/(.*)[&?]ticket=([^&?]*)$/);
    if (m) {
      const [, ourUrl, ticket] = m;
      this.ticketTobearer(ticket, ourUrl);
    } else if (sessionStorage["bearer"]) {
      this.bearer = sessionStorage["bearer"];
    } else {
      // this.login();
    }

    this.store$.pipe(select(getAuthenticatedUser)).subscribe(user => {
      if (user) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  ticketTobearer(ticket, service) {
    const url = `${this.casValidateUrl}?service=${encodeURIComponent(
      service
    )}&ticket=${encodeURIComponent(ticket)}`;
    return this.apiService.get(url).subscribe(response => {
      this.bearer = response.data.token;
      sessionStorage["bearer"] = this.bearer;
      this.store$.dispatch(
        new AuthenticationSuccessAction({
          user: response.data,
          token: response.data.token
        })
      );
      this.jwtService.saveToken(response.data.user.token);
    });
  }

  casLogin() {
    this.serviceUrl = encodeURIComponent(window.location.href);
    window.location.href = `${environment.cas_login_url}?service=${
      this.serviceUrl
    }`;
  }

  thirdPartyLogin(provider: AuthProviders) {
    switch (provider) {
      case AuthProviders.CAS:
        this.casLogin();
        break;
    }
  }
}
