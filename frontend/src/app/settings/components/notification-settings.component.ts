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
import { SettingsService } from "../services/settings.service";
import { BaseComponent } from "src/app/core/base-component";
import { takeUntil } from "rxjs/operators";
import { PushNotificationService } from "src/app/core/services/push-notification.service";

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
    email: new FormControl(""),
    usePushNotifications: new FormControl(false),
    useEMailNotifications: new FormControl(false)
  });

  matcher = new MyErrorStateMatcher();

  constructor(
    private settingsService: SettingsService,
    private notificationService: PushNotificationService
  ) {
    super();

    this.formGroup.patchValue(this.settingsService.settings);
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
        if (val) {
          this.notificationService.subscribeToPushNotifications();
        }
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
