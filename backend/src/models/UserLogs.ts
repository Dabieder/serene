import mongoose from "mongoose";

export interface UserLogModel extends mongoose.Document {
  accountName: string;
  logs: any[];
}

export const userLogSchema = new mongoose.Schema(
  {
    accountName: String,
    logs: [Object]
  },
  { timestamps: true }
);

export const UserLog: mongoose.Model<UserLogModel> = mongoose.model<
  UserLogModel
>("UserLog", userLogSchema);
