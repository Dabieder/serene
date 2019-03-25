import { Injectable } from "@angular/core";
@Injectable({
  providedIn: "root"
})
export class HeaderService {
  constructor() {}

  getHeaderForRoute(route: String) {
    if (route === "consent") {
      return "TLA Consent Form";
    }
    if (route === "signin") {
      return "Log in";
    }
    return "TLA Dashboard";
  }
}
