import { Injectable } from "@angular/core";

export const ROUTE_PARAMS = {
  Fullscreen: "fs",
  WrongPassword: "wp"
};

@Injectable()
export class RouteService {
  lastIntendedRoute: string;

  constructor() {}
}
