export class Experiment {
  startDate: Date;
  endDate: Date;
  name: string;
  groups: {
    name: string;
    participants: string[];
    conditions: any;
  };
}
