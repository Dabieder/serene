import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class EventService {
  events: Observable<any> = of([]);

  getEvents() {
    return this.events;
  }

  constructor() {}
}
