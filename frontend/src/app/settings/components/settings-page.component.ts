import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { SubmitSettingsAction } from "../store/settings.action";
import { NotificationDialogComponent } from "src/app/shared/dialogs/notification-dialog.component";
import { ErrorStateMatcher } from "@angular/material/core";
import { MatDialog } from "@angular/material/dialog";
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormGroup,
  FormBuilder
} from "@angular/forms";
import { Settings } from "../models/settings";
import { BaseComponent } from "src/app/core/base-component";
import { takeUntil } from "rxjs/operators";
import { SettingsService } from "../services/settings.service";

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
export class SettingsPageComponent extends BaseComponent implements OnInit {
  settingsForm: FormGroup;
  settings: Settings;
  emailFormControl = new FormControl("", [Validators.email]);

  matcher = new MyErrorStateMatcher();

  constructor(
    private store$: Store<Settings>,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private settingsService: SettingsService
  ) {
    super();

    this.settings = this.settingsService.settings;
  }

  ngOnInit() {
    // window.scroll(0, 0);
    this.settingsForm = this.fb.group({
      usePushNotifications: true,
      useEmailNotifications: false,
      eMailAddress: ""
    });
  }

  closeDialog() {}

  submit() {
    const settings = { ...this.settings };
    this.store$.dispatch(new SubmitSettingsAction({ settings }));
  }

  test() {
    const dialogRef = this.dialog.open(NotificationDialogComponent, {
      height: "400px",
      width: "600px"
    });
  }
}
