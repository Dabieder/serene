import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { HeaderService } from "../services/header.service";
import { AppState } from "src/app/reducers";
import { Store } from "@ngrx/store";
import { ToggleSidenavAction } from "../actions/layout.actions";
import { SignOutAction } from "src/app/user/store/auth.actions";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"]
})
export class ToolbarComponent implements OnInit {
  title: string;

  constructor(
    private router: Router,
    private headerService: HeaderService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.title = "";

    this.router.events.forEach(event => {
      if (event instanceof NavigationEnd) {
        const urlSegments = event.url.split("/");
        const last = urlSegments[urlSegments.length - 1];
        this.title = this.headerService.getHeaderForRoute(last);
      }
    });
  }

  sidebarToggle(event: any) {
    this.store.dispatch(new ToggleSidenavAction());
  }

  onLogoutClick() {
    this.store.dispatch(new SignOutAction());
  }
}
