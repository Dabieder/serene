
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-login-selection-page",
  template: `
    <div class="login-selection-page">
      <a href="http://localhost:3001/casauthentication">CAS login</a>
    </div>
  `,
  styles: []
})
export class LoginSelectionPageComponent implements OnInit {
  loginUrl = "http://localhost:3001/casauthentication";

  constructor() {}

  ngOnInit() {}
}
