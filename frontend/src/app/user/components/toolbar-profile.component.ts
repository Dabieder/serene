import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { AppState } from "../../reducers";
import { SignOutAction } from "../store/auth.actions";
import { Observable } from "rxjs";
import { User } from "../models/user";

@Component({
  selector: "app-toolbar-profile",
  templateUrl: "./toolbar-profile.component.html",
  styleUrls: ["./toolbar-profile.component.css"]
})
export class ToolbarProfileComponent implements OnInit {
  avatarImgPath: string;
  userData$: Observable<User>;

  constructor(private store: Store<AppState>) {}

  onLogoutClick() {
    this.store.dispatch(new SignOutAction());
  }

  ngOnInit() {
    this.avatarImgPath = "../assets/images/avatar_sample.png";
    this.userData$ = this.store.pipe(
      select(state => {
        return state.user.user;
      })
    );
  }
}
