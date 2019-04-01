import mongoose from "mongoose";

export interface UserLogModel extends mongoose.Document {
  accountName: string;
  edits: any[];
  deletions: any[];
  navigations: any[];
  notificationInteractions: any[];
  logs: any[];
}

export const userLogSchema = new mongoose.Schema(
  {
    accountName: String,
    logs: [Object],
    deletions: [Object],
    navigations: [Object],
    notificationInteractions: [Object],
    edits: [Object]
  },
  { timestamps: true }
);

export const UserLog: mongoose.Model<UserLogModel> = mongoose.model<
  UserLogModel
>("UserLog", userLogSchema);
