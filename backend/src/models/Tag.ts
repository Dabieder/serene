import mongoose from "mongoose";

export interface TagModel extends mongoose.Document {
  id: String;
  name: String;
}

const tagSchema = new mongoose.Schema({
  id: String,
  name: String
});

export const Tag: mongoose.Model<TagModel> = mongoose.model<TagModel>(
  "Tag",
  tagSchema
);
