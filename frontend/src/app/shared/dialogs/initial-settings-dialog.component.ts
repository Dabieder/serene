import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { SettingsService } from "src/app/settings/settings.service";
import { PushNotificationService } from "src/app/core/services/push-notification.service";
@Component({
  selector: "app-initial-settings-dialog",
  templateUrl: "./initial-settings-dialog.component.html",
  styleUrls: ["./initial-settings-dialog.component.scss"]
})
export class InitialSettingsDialogComponent implements OnInit {
  dialogResult: InitialSettingsDialogData;

  constructor(
    public dialogRef: MatDialogRef<InitialSettingsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InitialSettingsDialogData,
    private settingsService: SettingsService,
    private notificationService: PushNotificationService
  ) {}

  ngOnInit() {}

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

  updateEMail() {}

  pushNotificationsClick() {
    this.notificationService.subscribeToPushNotifications();
  }

  submit() {
    this.settingsService.updateSettings(this.data);
    this.dialogRef.close();
  }
}

export interface InitialSettingsDialogData {
  surveyCode: string;
  usePushNotifications: boolean;
  useEMailNotifications: boolean;
  email: string;
}
