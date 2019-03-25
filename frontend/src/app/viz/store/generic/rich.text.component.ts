import { Component } from "@angular/core";
import { VizComponentInterface } from "../../visualisation.component.interface";

@Component({
  templateUrl: "./rich.text.component.html",
  styleUrls: ["./rich.text.component.css"]
})
export class RichTextComponent implements VizComponentInterface {
  text = "";

  setVisualisationData(data: any) {}
  setConfig(config: any): void {
    this.text = config.text;
  }
  setXapiEmit(callback: any): void {}
}
