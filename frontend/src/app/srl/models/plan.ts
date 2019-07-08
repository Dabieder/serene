import { Time } from "@angular/common";
import { Tag } from "src/app/shared/models/tag";

export interface Plan {
  plannedDuration: Time;
  creationDate: Date;
  completionDate: Date;
  completed: boolean;
  startDate: Date;
  endDate: Date;
  goal: string;
  comment: string;
  id: string;
  tags: string[];
}
