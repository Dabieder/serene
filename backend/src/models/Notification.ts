import mongoose from "mongoose";

export enum NotificationType {
  LearningPlan = "LearningPlan"
}

export interface NotificationModel extends mongoose.Document {
  accountName: string;
  id: string;
  type: NotificationType;
  dueDate: Date;
  planId: string;
}

const notificationSchema = new mongoose.Schema(
  {
    accountName: String,
    id: String,
    type: Object,
    dueDate: Date,
    planId: String
  },
  { timestamps: true }
);

export const Notification: mongoose.Model<NotificationModel> = mongoose.model<
  NotificationModel
>("Notification", notificationSchema);
