import { TrackingItem } from "./tracking-item";
import { LearningPlan } from "./learning-plan";

export class TrackingResult {
  reasons: TrackingItem[] = [];
  learningPlans: LearningPlan[] = [];
}
