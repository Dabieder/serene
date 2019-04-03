import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { SubmitSettingsAction } from "../store/settings.action";
import { SettingsState } from "../store/settings.reducer";
import { NotificationDialogComponent } from "src/app/shared/components/dialogs/notification-dialog.component";
import { MatDialog, ErrorStateMatcher } from "@angular/material";
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators
} from "@angular/forms";
import { Settings } from "../models/settings";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: "app-settings-page",
  templateUrl: "./settings-page.component.html",
  styleUrls: ["./settings-page.component.scss"]
})
export class SettingsPageComponent implements OnInit {
  settings: Settings;
  emailFormControl = new FormControl("", [Validators.email]);

  matcher = new MyErrorStateMatcher();

  constructor(private store$: Store<SettingsState>, public dialog: MatDialog) {
    this.settings = {
      usePushNotifications: true,
      useEMailNotifications: true,
      eMailAddress: "biedermann@dipf.de",
      dateFormat: "dd/MM/yyyy",
      language: "en"
    };
  }

  ngOnInit() {}

  closeDialog() {}

  submit() {
    this.store$.dispatch(new SubmitSettingsAction({ settings: this.settings }));
  }

  test() {
    const dialogRef = this.dialog.open(NotificationDialogComponent, {
      height: "400px",
      width: "600px"
    });
  }
}
