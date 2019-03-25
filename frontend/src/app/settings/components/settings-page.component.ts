import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { SubmitSettingsAction } from "../store/settings.action";
import { SettingsState } from "../store/settings.reducer";

@Component({
  selector: "app-settings-page",
  templateUrl: "./settings-page.component.html",
  styleUrls: ["./settings-page.component.scss"]
})
export class SettingsPageComponent implements OnInit {
  constructor(private store$: Store<SettingsState>) {}

  ngOnInit() {}

  closeDialog() {}

  submit() {
    const settings = {
      enableNotifications: true
    };
    this.store$.dispatch(new SubmitSettingsAction({ settings }));
  }
}
