import { Injectable } from "@angular/core";
import {
  ActivatedRoute,
  Router,
  NavigationEnd,
  NavigationStart
} from "@angular/router";
import { LoggingService } from "./logging.service";
import { map } from "rxjs/operators";

export const ROUTE_PARAMS = {
  Fullscreen: "fs",
  WrongPassword: "wp"
};

@Injectable({
  providedIn: "root"
})
@Injectable()
export class RouteLoggingService {
  lastIntendedRoute: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loggingService: LoggingService
  ) {
    this.router.events.subscribe(val => {
      if (val instanceof NavigationStart) {
        if (val.url.includes("ref=")) {
          this.loggingService.logReferral(val.url);
          console.log("Navigation Start: ", this.router);
        }
      }
      if (val instanceof NavigationEnd) {
        this.loggingService.logNavigation(val.url);
      }
    });

    this.route.queryParamMap.subscribe(paramMap => {
      console.log("query param map: ", paramMap);
    });

    this.route.paramMap.subscribe(paramMap => {
      console.log("param map: ", paramMap);
    });
  }
}