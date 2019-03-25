import mongoose from "mongoose";
import moment from "moment";
import { defaultReasons } from "../../data/defaultReasons";

export interface SrlWidgetModel extends mongoose.Document {
  accountName: string;
  learningPlans: any[];
  reasons: any;
  monitorings: any[];
  toTransfer: toTransferFunction;
  metaSettings: any;
}

const srlWidgetSchema = new mongoose.Schema(
  {
    accountName: String,
    learningPlans: Array,
    reasons: Object,
    metaSettings: Object,
    monitorings: Array
  },
  { timestamps: true }
);

type toTransferFunction = () => object;
const toTransfer: toTransferFunction = function() {
  return {
    learningPlans: this.learningPlans,
    reasons: this.reasons,
    metaSettings: this.metaSettings,
    monitorings: this.monitorings
  };
};
srlWidgetSchema.methods.toTransfer = toTransfer;

export const generateNewPlanForId = (accountName: string) => {
  return new SrlWidget({
    accountName,
    learningPlans: [],
    monitorings: [],
    reasons: getDefaultReasons()
  });
};

const getDefaultReasons = () => {
  return defaultReasons;
};

export const SrlWidget: mongoose.Model<SrlWidgetModel> = mongoose.model<
  SrlWidgetModel
>("SrlWidget", srlWidgetSchema);
