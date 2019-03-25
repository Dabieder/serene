import { RatingItem } from "./rating-item";
import { Time } from "@angular/common";

export interface Plan {
  plannedDuration: Time;
  actualDuration: Time;
  creationDate: Date;
  startDate: Date;
  endDate: Date;
  reasons: RatingItem[];
  goal: string;
  comment: string;
  id: string;
}
