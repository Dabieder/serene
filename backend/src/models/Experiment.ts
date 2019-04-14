import mongoose from "mongoose";
import { any } from "bluebird";

export interface ExperimentModel extends mongoose.Document {
  startDate: Date;
  endDate: Date;
  name: string;
  groups: [{
    name: string;
    participants: string[];
    conditions: any;
  }];
}

const experimentSchema = new mongoose.Schema({
  startDate: Date,
  endDate: String,
  name: String,
  groups: [{
    name: String,
    participants: [],
    conditions: Object
  }]
});

export const Experiment: mongoose.Model<ExperimentModel> = mongoose.model<
  ExperimentModel
>("Experiment", experimentSchema);
