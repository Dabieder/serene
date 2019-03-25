import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PolarChartVizComponent } from "./polar.viz.component";

import { VizService } from "../../visualisation.service";
import { VisualisationDynamicComponent } from "../../visualisation.dynamic.component";
import { ChartsModule } from "ng2-charts";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [CommonModule, ChartsModule, FormsModule],

  declarations: [PolarChartVizComponent],
  entryComponents: [PolarChartVizComponent]
})
export class Ng2ChartsVizModule {
  constructor(private service: VizService) {
    this.service.addService(
      "ng2-polar",
      new VisualisationDynamicComponent(PolarChartVizComponent)
    );
  }
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: Ng2ChartsVizModule
    };
  }
}
