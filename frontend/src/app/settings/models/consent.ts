import { ConsentItem } from "./consent-item";

export class Consent {
  constructor(
    public consented: boolean,
    public introduction: string[],
    public disclaimerDataUsage: string[],
    public dataTypeIntroduction: string[],
    public consentItems: ConsentItem[],
    public id: string
  ) {}
}
