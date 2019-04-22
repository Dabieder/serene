import mongoose from "mongoose";
import { defaultReasons as defaultReasonsDE } from "../../data/defaultReasons_DIPF.de";
import { defaultReasons as defaultReasonsEN } from "../../data/defaultReasons_DIPF.en";
import { LANGUAGE } from "../../util/constants";

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
  if (LANGUAGE === "de") {
    return defaultReasonsDE;
  } else {
    return defaultReasonsEN;
  }
};

export const SrlWidget: mongoose.Model<SrlWidgetModel> = mongoose.model<
  SrlWidgetModel
>("SrlWidget", srlWidgetSchema);
