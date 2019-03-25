import { Component, OnInit } from "@angular/core";
import { Alert, AlertType, ALERTS } from "../../models/alert";
import { AppState, getAlerts } from "src/app/reducers";
import { Store, select } from "@ngrx/store";
import {
  ShowAlertAction,
  HideAlertAction
} from "src/app/core/actions/alerts.actions";

@Component({
  selector: "app-alerts",
  templateUrl: "./alerts.component.html",
  styleUrls: ["./alerts.component.scss"]
})
export class AlertsComponent implements OnInit {
  alerts: Alert[] = [];

  alerts$ = this.store$.pipe(select(getAlerts));

  constructor(private store$: Store<AppState>) {}

  removeAlert(alert: Alert) {
    this.store$.dispatch(
      new HideAlertAction({
        alert
      })
    );
  }

  ngOnInit() {}

  test() {
    this.store$.dispatch(
      new ShowAlertAction({ alert: ALERTS.SERVER_CONNECTION_ERROR })
    );

    this.store$.dispatch(new ShowAlertAction({ alert: ALERTS.NEW_MESSAGE }));
  }

  getClassForType(alert: Alert) {
    if (!alert) return;

    switch (alert.type) {
      case AlertType.Success:
        return "alerts-success";
      case AlertType.Error:
        return "alerts-error";
      case AlertType.Info:
        return "alerts-info";
      case AlertType.Warning:
        return "alerts-warning";
    }
  }
}
