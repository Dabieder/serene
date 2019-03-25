import mongoose from "mongoose";
import { ConsentModel, consentSchema } from "./Consent";

export interface CourseModel extends mongoose.Document {
  title: String;
  startDate: Date;
  endDate: Date;
  consent: ConsentModel;
  participants: [String];
  pages: Array<String>;
  id: String;
}

const courseSchema = new mongoose.Schema(
  {
    title: String,
    startDate: String,
    endDate: String,
    consent: consentSchema,
    participants: [String],
    id: String,
    pages: [String],
  },
  { timestamps: true }
);

export const Course: mongoose.Model<CourseModel> = mongoose.model<CourseModel>(
  "Course",
  courseSchema
);
