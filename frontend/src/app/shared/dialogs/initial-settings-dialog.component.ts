import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
@Component({
  selector: "app-initial-settings-dialog",
  templateUrl: "./initial-settings-dialog.component.html",
  styleUrls: ["./initial-settings-dialog.component.scss"]
})
export class InitialSettingsDialogComponent implements OnInit {
  dialogResult: InitialSettingsDialogData;

  constructor(
    public dialogRef: MatDialogRef<InitialSettingsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InitialSettingsDialogData
  ) {}

  ngOnInit() {}

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

  updateEMail() {}

  pushNotificationsClick() {}

  submit() {
    this.dialogRef.close();
  }
}

export interface InitialSettingsDialogData {
  surveyCode: string;
  usePushNotifications: boolean;
  useEMailNotifications: boolean;
  eMail: string;
}
