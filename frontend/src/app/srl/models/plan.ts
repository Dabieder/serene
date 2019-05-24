import { Time } from "@angular/common";

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
}
