import mongoose from "mongoose";

export interface SurveyDataModel extends mongoose.Document {
  accountName: string;
  surveyId: string;
  dimension: string;
  surveyResults: any;
  resultsRaw: Array<any>;
}

const surveyDataSchema = new mongoose.Schema(
  {
    accountName: String,
    surveyResults: Object,
    surveyId: String,
    dimension: String,
    resultsRaw: []
  },
  { timestamps: true }
);

export const SurveyData: mongoose.Model<SurveyDataModel> = mongoose.model<
  SurveyDataModel
>("SurveyData", surveyDataSchema);
