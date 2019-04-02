import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { SubmitSettingsAction } from "../store/settings.action";
import { SettingsState } from "../store/settings.reducer";
import { NotificationDialogComponent } from "src/app/shared/components/dialogs/notification-dialog.component";
import { MatDialog } from "@angular/material";

@Component({
  selector: "app-settings-page",
  templateUrl: "./settings-page.component.html",
  styleUrls: ["./settings-page.component.scss"]
})
export class SettingsPageComponent implements OnInit {
  constructor(private store$: Store<SettingsState>, public dialog: MatDialog) {}

  ngOnInit() {}

  closeDialog() {}

  submit() {
    const settings = {
      enableNotifications: true
    };
    this.store$.dispatch(new SubmitSettingsAction({ settings }));
  }

  test() {
    const dialogRef = this.dialog.open(NotificationDialogComponent, {
      height: "400px",
      width: "600px"
    });
  }
}
