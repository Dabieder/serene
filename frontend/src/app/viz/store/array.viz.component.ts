import { Component } from "@angular/core";
import { VizComponentInterface } from "../visualisation.component.interface";

@Component({
  // providers: [QueryService],
  template: `
    <table class="table">
                <tbody><tr>
                  <th>{{header1}}</th>
                  <th>{{header2}}</th>
                </tr>
                <tr *ngFor="let row of data">

                  <td>{{row.name}}</td>
                  <td>
                    {{row.value}}
                  </td>
                </tr>
              </tbody></table>
    `
})
export class ArrayVizComponent implements VizComponentInterface {
  queryId: string;
  data: any;
  header1: string;
  header2: string;
  constructor() {}

  setVisualisationData(data: any) {
    this.data = data.data;
    this.header1 = data.metadata.xAxis;
    this.header2 = data.metadata.yAxis;
  }
  setConfig(config: any): void {}
  setXapiEmit(callback: any): void {}
}
