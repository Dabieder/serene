import { Component, OnInit } from "@angular/core";
import { ApiService, ENDPOINTS } from "src/app/core/services";
import { Observable } from "rxjs";
import { User } from "src/app/user/models/user";
import { map } from "rxjs/operators";

@Component({
  selector: "app-administrator-page",
  templateUrl: "./administrator-page.component.html",
  styleUrls: ["./administrator-page.component.scss"]
})
export class AdministratorPageComponent implements OnInit {
  users$: Observable<User[]>;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.users$ = this.apiService
      .get(ENDPOINTS.ALL_USERS)
      .pipe(map(response => response.data));
  }
}
