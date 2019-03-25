import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  GenericVisualisationComponent,
  VizDirective
} from "./generic.visualisation.component";
import { ArrayVizComponent } from "./store/array.viz.component";

import { VizService } from "./visualisation.service";
import { Ng2ChartsVizModule } from "./store/ng2-charts/ng2.charts.module";
import { GenericVizModule } from "./store/generic/generic.module";
import { SrlWidgetModule } from "./store/srl-widget/srl-widget.module";

@NgModule({
  imports: [
    CommonModule,
    Ng2ChartsVizModule.forRoot(),
    GenericVizModule.forRoot(),
    SrlWidgetModule.forRoot()
  ],

  declarations: [
    GenericVisualisationComponent,
    VizDirective,
    ArrayVizComponent
  ],
  entryComponents: [ArrayVizComponent],
  providers: [{ provide: VizService, useClass: VizService }],

  exports: [GenericVisualisationComponent]
})
export class VizModule {}
