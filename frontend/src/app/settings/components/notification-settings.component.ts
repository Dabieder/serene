import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import {
  FormControl,
  FormGroupDirective,
  Validators,
  NgForm,
  FormGroup
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { Settings } from "../models/settings";
import { SettingsService } from "../settings.service";
import { BaseComponent } from "src/app/core/base-component";
import { takeUntil } from "rxjs/operators";

/** Error when invalid control is dirty, touched, or submitted. */
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
  selector: "app-notification-settings",
  templateUrl: "./notification-settings.component.html",
  styleUrls: ["./notification-settings.component.scss"]
})
export class NotificationSettingsComponent extends BaseComponent
  implements OnInit {
  @Input() settings: Settings;
  formGroup: FormGroup = new FormGroup({
    email: new FormControl("biedermann@dipf.de"),
    usePushNotifications: new FormControl(true),
    useEMailNotifications: new FormControl(true)
  });

  matcher = new MyErrorStateMatcher();

  constructor(private settingsService: SettingsService) {
    super();
  }

  ngOnInit() {
    this.onChanges();
  }

  onChanges() {
    this.formGroup
      .get("usePushNotifications")
      .valueChanges.pipe(takeUntil(this.unsubscribe$))
      .subscribe(val => {
        console.log("Value Change usePushNotifications: ", val);
        this.settingsService.updateSettings({ usePushNotifications: val });
      });

    this.formGroup
      .get("useEMailNotifications")
      .valueChanges.pipe(takeUntil(this.unsubscribe$))
      .subscribe(val => {
        console.log("Value Change: ", val);
        this.settingsService.updateSettings({ useEMailNotifications: val });
      });
  }

  updateEMail() {
    this.settingsService.updateSettings({
      email: this.formGroup.get("email").value
    });
  }
}
