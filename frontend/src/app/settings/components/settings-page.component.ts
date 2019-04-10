import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { SubmitSettingsAction } from "../store/settings.action";
import { NotificationDialogComponent } from "src/app/shared/components/dialogs/notification-dialog.component";
import { MatDialog, ErrorStateMatcher } from "@angular/material";
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
    private fb: FormBuilder
  ) {
    super();

    this.settings = {
      usePushNotifications: true,
      useEMailNotifications: true,
      eMailAddress: "biedermann@dipf.de",
      dateFormat: "dd/MM/yyyy",
      language: "en"
    };
  }

  ngOnInit() {
    // this.store$
    // .pipe(
    //   select(getSettings),
    //   takeUntil(this.unsubscribe$)
    // )
    // .subscribe(settings => {
    //   if (settings) {
    //     this.settings = {...settings};
    //   }
    // });
    this.settingsForm = this.fb.group({
      usePushNotifications: true,
      useEmailNotifications: false,
      eMailAddress: "d@b.de"
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
