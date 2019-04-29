import mongoose from "mongoose";

export interface ApplicationLogModel extends mongoose.Document {
  logs: any[];
}

export const applicationLogSchema = new mongoose.Schema(
  {
    logs: [Object]
  },
  { timestamps: true }
);

export const ApplicationLog: mongoose.Model<ApplicationLogModel> = mongoose.model<
  ApplicationLogModel
>("ApplicationLog", applicationLogSchema);
