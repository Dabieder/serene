import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class SettingsService {
  constructor() {}

  settingsData: Observable<any> = of([]);

  getSettingsData() {
    return this.settingsData;
  }
}
