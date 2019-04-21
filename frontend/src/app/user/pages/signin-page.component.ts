import { Component, OnInit, OnDestroy, isDevMode } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AppState } from "../../reducers";
import { Store } from "@ngrx/store";
import { AuthProviders } from "../../core/services/authentication.service";
import {
  AuthenticateAction,
  AuthenticateThirdPartyAction
} from "../store/auth.actions";
import { ActivatedRoute } from "@angular/router";
import { ROUTE_PARAMS } from "src/app/core/services/route-logging.service";
import { environment } from "src/environments/environment";
@Component({
  selector: "app-signin-page",
  templateUrl: "./signin-page.component.html",
  styleUrls: ["./signin-page.component.scss"]
})
export class SignInPageComponent implements OnDestroy, OnInit {
  loginForm: FormGroup;
  // TODO: Use the isLoading from the ngrx store instead of having separate state
  isSubmitting = false;
  alive = true;
  showIncorrectUsernamePassword = false;
  environment = environment;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  ngOnInit() {
    if (isDevMode()) {
      this.loginForm.controls["username"].setValue("test@test.de");
      this.loginForm.controls["password"].setValue("test");
    }

    this.route.queryParams.subscribe(params => {
      this.isSubmitting = false;
      this.showIncorrectUsernamePassword = false;
      if (params && params[ROUTE_PARAMS.WrongPassword]) {
        const wp = params[ROUTE_PARAMS.WrongPassword] === "1";
        if (wp) {
          this.showIncorrectUsernamePassword = true;
          this.loginForm.controls["username"].setValue("");
          this.loginForm.controls["password"].setValue("");
        }
      }
    });
  }

  public ngOnDestroy() {
    this.alive = false;
  }

  submitForm() {
    this.isSubmitting = true;
    const accountName = this.loginForm.controls["username"].value;
    const password = this.loginForm.controls["password"].value;

    this.store.dispatch(new AuthenticateAction({ accountName, password }));
  }

  casLoginClick() {
    this.store.dispatch(
      new AuthenticateThirdPartyAction({ serviceName: AuthProviders.CAS })
    );
  }
}
