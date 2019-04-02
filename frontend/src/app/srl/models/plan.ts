import { RatingItem } from "./rating-item";
import { Time } from "@angular/common";

export interface Plan {
  plannedDuration: Time;
  creationDate: Date;
  startDate: Date;
  endDate: Date;
  goal: string;
  comment: string;
  id: string;
}
