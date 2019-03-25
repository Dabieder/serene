import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Consent } from "../models/consent";
import { map } from "rxjs/operators";
import { User } from "../models/user";
import { getAuthenticatedUser, AppState } from "../../reducers";
import { Store, select } from "@ngrx/store";
import { ApiService } from "../../core/services";

@Injectable({
  providedIn: "root"
})
export class ConsentService {
  constructor(private apiService: ApiService, private store: Store<AppState>) {
    this.init();
  }
  consent: Consent;
  user: User;

  init() {
    this.store.pipe(select(getAuthenticatedUser)).subscribe(u => {
      this.user = u;
    });
  }

  getConsent(courseId: string): Observable<Consent> {
    if (this.user) {
      const url = `/courses/${courseId}/consent`;
      return this.apiService.get(url).pipe(
        map(data => {
          return data;
        })
      );
    }
  }

  setConsent(consent: Consent, courseId: string): Observable<any> {
    const url = `/courses/${courseId}/consent`;
    const consentObject = { consent: consent };
    return this.apiService.post(url, consentObject).pipe(
      map(response => {
        return response;
      })
    );
  }
}
