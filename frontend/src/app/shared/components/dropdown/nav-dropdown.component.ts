import { Component, OnInit, Input } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/reducers";
import { SignOutAction } from "src/app/user/store/auth.actions";

@Component({
  selector: "app-nav-dropdown",
  templateUrl: "./nav-dropdown.component.html",
  styleUrls: ["./nav-dropdown.component.scss"]
})
export class NavDropdownComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit() {}

  signOutClick(event: any) {
    this.store.dispatch(new SignOutAction());
  }
}
