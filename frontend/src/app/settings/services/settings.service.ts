import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { ApiService, ENDPOINTS } from "../../core/services";
import { getSettings, SettingsState } from "../store/settings.reducer";
import { Store, select } from "@ngrx/store";
import { map, tap } from "rxjs/operators";
import { Settings } from "../models/settings";
import { SubmitSettingsAction } from "../store/settings.action";
import { ApplicationSettings } from "../models/application-settings";
@Injectable({
  providedIn: "root"
})
export class SettingsService {
  settings: Settings;
  applicationSettings: ApplicationSettings = {
    useEndDate: true,
    useStartDate: false
  };
  constructor(
    private apiService: ApiService,
    private store$: Store<SettingsState>
  ) {
    this.store$.pipe(select(getSettings)).subscribe(settings => {
      console.log("Got Settings In Settings Service: ", settings);
      this.settings = settings;
    });
  }

  settingsData: Observable<any> = of([]);

  getSettingsData() {
    return this.settingsData;
  }

  updateSettings(changedSettings: any) {
    this.settings = { ...this.settings, ...changedSettings };
    this.store$.dispatch(new SubmitSettingsAction({ settings: this.settings }));
  }

  getApplicationSettings() {
    return of(this.applicationSettings);
  }

  getLanguage() {
    // if (this.settings) {
    //   return this.settings.language;
    // }
    return "de";
  }
}
