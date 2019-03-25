import mongoose from "mongoose";

export interface SettingsModel extends mongoose.Document {
  accountName: string;
  settings: any;
}

const settingsSchema = new mongoose.Schema({
  accountName: String,
  settings: Object
});

export const Settings: mongoose.Model<SettingsModel> = mongoose.model<
  SettingsModel
>("Settings", settingsSchema);
