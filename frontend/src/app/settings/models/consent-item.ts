export class ConsentItem {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public consented: boolean,
    public icon: string,
    public dataCollected: string[]
  ) {}
}
