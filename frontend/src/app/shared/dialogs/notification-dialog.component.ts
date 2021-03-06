import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-notification-dialog",
  templateUrl: "./notification-dialog.component.html",
  styleUrls: ["./notification-dialog.component.scss"]
})
export class NotificationDialogComponent implements OnInit {
  dialogResult: NotificationDialogData;

  constructor(
    public dialogRef: MatDialogRef<NotificationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NotificationDialogData
  ) {
    this.dialogResult = {
      useEMailNotifications: true,
      usePushNotifications: true,
      email: ""
    };
  }

  ngOnInit() {}

  cancelClick() {}

  submitClick() {}
}

export interface NotificationDialogData {
  usePushNotifications: boolean;
  useEMailNotifications: boolean;
  email: string;
}
