import { Component, Pipe, PipeTransform } from "@angular/core";
import { VizComponentInterface } from "../../../visualisation.component.interface";

@Pipe({
  name: "prettyprint"
})
export class PrettyPrintPipe implements PipeTransform {
  transform(val) {
    return JSON.stringify(val, null, 2)
      .replace(" ", "&nbsp;")
      .replace("\n", "<br/>");
  }
}

@Component({
  selector: "app-raw-data",
  templateUrl: "./raw-data.component.html",
  styleUrls: ["./raw-data.component.css"]
})
export class RawDataComponent implements VizComponentInterface {
  rawData = {};

  setVisualisationData(data: any) {
    if (data) {
      this.rawData = data;
    } else {
      this.rawData = { error: "data was undefined" };
    }
  }
  setConfig(config: any): void {}

  setXapiEmit(callback: any): void {}
}
