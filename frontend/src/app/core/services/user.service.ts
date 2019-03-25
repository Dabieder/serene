import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { User } from "../../user/models/user";
import { ApiService } from "./api.service";
import { map } from "rxjs/operators";
import { JwtService } from "./jwt.service";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private _isLoggedIn = false;

  constructor(private apiService: ApiService, private jwtService: JwtService) {}

  populate(): Observable<User> {
    if (this.jwtService.getToken()) {
      return this.apiService.get("/user");
    }
  }

  signUp(email: string, password: string): Observable<User> {
    return this.apiService.post("/auth/signup", { email, password }).pipe(
      map(data => {
        this.jwtService.saveToken(data.user.token);
        return data;
      })
    );
  }

  signIn(accountName: string, password: string): Observable<User> {
    return this.apiService.post("/auth/signin", { accountName, password }).pipe(
      map(data => {
        this.jwtService.saveToken(data.user.token);
        this._isLoggedIn = true;
        return data.user;
      })
    );
  }

  signOut(): Observable<boolean> {
    this.jwtService.destroyToken();
    return of(true);
  }

  public authenticated(): Observable<boolean> {
    return of(this._isLoggedIn);
  }
}
