import mongoose from "mongoose";

export interface XApiStatementModel extends mongoose.Document {
  statement: any;
}

const xApiStatementSchema = new mongoose.Schema(
  {
    statement: Object
  },
  { timestamps: true }
);

export const XApiStatement: mongoose.Model<XApiStatementModel> = mongoose.model<
  XApiStatementModel
>("XApiStatement", xApiStatementSchema);
