import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Consent } from "../models/consent";
import { map } from "rxjs/operators";
import { getAuthenticatedUser, AppState } from "../../reducers";
import { Store, select } from "@ngrx/store";
import { ApiService, ENDPOINTS } from "../../core/services";

@Injectable({
  providedIn: "root"
})
export class ConsentService {
  constructor(private apiService: ApiService, private store: Store<AppState>) {
    this.init();
  }
  consent: Consent;
  init() {}

  getConsent(courseId: string): Observable<Consent> {
    return this.apiService.get(ENDPOINTS.CONSENT).pipe(
      map(data => {
        return data;
      })
    );
  }

  setConsent(consent: Consent, courseId: string): Observable<any> {
    const consentObject = { consent: consent };
    return this.apiService.post(ENDPOINTS.CONSENT, consentObject).pipe(
      map(response => {
        return response;
      })
    );
  }
}
