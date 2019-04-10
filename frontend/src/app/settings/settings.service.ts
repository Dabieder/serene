import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { ApiService, ENDPOINTS } from "../core/services";
import { getSettings } from "./store/settings.reducer";
import { Store, select } from "@ngrx/store";
import { map, tap } from "rxjs/operators";
import { Settings } from "./models/settings";
@Injectable({
  providedIn: "root"
})
export class SettingsService {
  settings: Settings;
  constructor(private apiService: ApiService, private store$: Store<Settings>) {
    this.store$.pipe(select(getSettings)).subscribe(settings => {
      console.log("Got Settings In Settings Service: ", settings);
      this.settings = settings;
    });
  }

  settingsData: Observable<any> = of([]);

  getSettingsData() {
    return this.settingsData;
  }

  // TODO: Put into ngrx store
  updateSettings(settings: any) {
    this.apiService
      .post(ENDPOINTS.SETTINGS, settings)
      .pipe(
        tap(res => {
          console.log("Updated settings; ", res);
        })
      )
      .subscribe();
  }
}
