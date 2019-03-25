import mongoose from "mongoose";

export interface QueryModel extends mongoose.Document {
  id: string;
  metaData: any;
  data: any;
}

export const querySchema = new mongoose.Schema(
  {
    id: String,
    metaData: Object,
    data: Object
  },
  { timestamps: true }
);

export const Query: mongoose.Model<QueryModel> = mongoose.model<QueryModel>(
  "Query",
  querySchema
);
