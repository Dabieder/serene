import mongoose from "mongoose";

export interface CoursePageModel extends mongoose.Document {
  courseId: String;
  pageId: String;
  name: String;
  rows: any;
  columns: any;
}

export const coursePageSchema = new mongoose.Schema(
  {
    courseId: String,
    pageId: String,
    name: String,
    rows: Object,
    columns: Object
  },
  { timestamps: true }
);

export const CoursePage: mongoose.Model<CoursePageModel> = mongoose.model<CoursePageModel>("CoursePage", coursePageSchema);
