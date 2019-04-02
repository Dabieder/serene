import { Injectable } from "@angular/core";
import { AppState } from "../store";
import { Store } from "@ngrx/store";
import { SubmitXapi } from "src/app/dashboard/actions/xapi.actions";

export const ObjectIds = {
  Navigation: "Navigation"
};

export const ItemTypes = {
  NavigationDayChange: "Day Change Navigation",
  NavigationWeekChange: "Week Change Navigation",
  NavigationSubPageChange: "Sub Page Change Navigation"
};

@Injectable({
  providedIn: "root"
})
export class SrlWidgetXapiService {
  callback: any;

  constructor(private store: Store<AppState>) {}

  setCallback(callback: any) {
    this.callback = callback;
  }

  submitStatement(statement: any) {
    // if (this.callback) {
    //   this.callback(statement);
    // } else {
    //   this.store.dispatch(new SubmitXapi(statement));
    // }
    this.store.dispatch(new SubmitXapi(statement));
  }

  getNavigationStatement(
    objectId: string,
    itemType: string,
    objectName: string
  ) {
    const timestamp = Date.now();
    return {
      version: "1.0.0",
      timestamp: timestamp,
      actor: {
        objectType: "Agent",
        account: { name: "Dabieder" }
      },
      verb: {
        id: "http://id.tincanapi.com/verb/viewed",
        display: {
          en: "viewed"
        }
      },
      object: {
        objectType: "Activity",
        id: objectId,
        definition: {
          type: itemType,
          name: {
            en: objectName
          }
        }
      }
    };
  }
}
