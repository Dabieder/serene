import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroupDirective,
  Validators,
  NgForm
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

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
export class NotificationSettingsComponent implements OnInit {
  emailFormControl = new FormControl("", [Validators.email]);

  matcher = new MyErrorStateMatcher();

  constructor() {}

  ngOnInit() {}
}
