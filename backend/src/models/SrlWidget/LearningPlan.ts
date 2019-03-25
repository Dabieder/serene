export interface LearningPlan {
  [x: string]: any;
  startDate: Date;
  endDate: Date;
  creationDate: Date;
  subPlans: LearningPlan[];
  remind: boolean;
}

export const getLearningPlansFlattened = (
  learningPlans: LearningPlan[]
): LearningPlan[] => {
  let flattened = [];
  for (const plan of learningPlans) {
    flattened.push(plan);
    if (plan.subPlans && plan.subPlans.length > 0) {
      flattened = [
        ...flattened,
        ...this.getLearningPlansFlattened(plan.subPlans)
      ];
    }
  }
  return flattened;
};
