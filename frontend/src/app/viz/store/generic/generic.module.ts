import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RichTextComponent } from "./rich.text.component";

import { VizService } from "../../visualisation.service";
import { VisualisationDynamicComponent } from "../../visualisation.dynamic.component";
import { ChartsModule } from "ng2-charts";
import { FormsModule } from "@angular/forms";
import {
  RawDataComponent,
  PrettyPrintPipe
} from "./raw-data/raw-data.component";

@NgModule({
  imports: [CommonModule, ChartsModule, FormsModule],

  declarations: [RichTextComponent, RawDataComponent, PrettyPrintPipe],
  entryComponents: [RichTextComponent, RawDataComponent]
})
export class GenericVizModule {
  constructor(private service: VizService) {
    this.service.addService(
      "raw-data",
      new VisualisationDynamicComponent(RawDataComponent)
    );
    this.service.addService(
      "rich-text",
      new VisualisationDynamicComponent(RichTextComponent)
    );
  }
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: GenericVizModule
    };
  }
}
