import { RatingItem, IRatingItem } from "./rating-item";
import { LearningPlan } from "./learning-plan";

export class Monitoring {
  reasons: IRatingItem[] = [];
  plans: LearningPlan[] = [];
  date: Date;
}
