import mongoose from "mongoose";

export interface ConsentItemModel extends mongoose.Document {
  consented: Boolean;
  description: string;
  name: string;
  id: string;
  dataCollected: [string];
}

export interface ConsentModel extends mongoose.Document {
  consented: boolean;
  consentItems: ConsentItemModel[];
  id: string;
}

export const consentItemSchema = new mongoose.Schema(
  {
    id: String,
    name: String,
    consented: Boolean,
    dataCollected: Array,
    description: String
  },
  { timestamps: true }
);

export const consentSchema = new mongoose.Schema(
  {
    id: String,
    consented: Boolean,
    consentItems: [consentItemSchema]
  },
  { timestamps: true }
);

export const Consent: mongoose.Model<ConsentModel> = mongoose.model<ConsentModel>(
  "Consent",
  consentSchema
);
