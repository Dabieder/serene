
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import { UserService } from "../../core/services/user.service";

@Component({
  selector: "app-signup-page",
  templateUrl: "./signup-page.component.html",
  styleUrls: ["./signup-page.component.css"]
})
export class SignupPageComponent implements OnInit {
  signupForm: FormGroup;
  isSubmitting = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.signupForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
      username: [""]
    });
  }

  ngOnInit() {}

  submitForm() {
    this.isSubmitting = true;
    const credentials = this.signupForm.value;
    console.log("Submitting Signup with credentials: ", credentials);
    const email = this.signupForm.controls["email"].value;
    const password = this.signupForm.controls["password"].value;
    this.userService.signUp(email, password).subscribe(
      err => {
        this.isSubmitting = false;
      }
    );
  }
}
