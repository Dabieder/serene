
import { Injectable } from "@angular/core";
import { ArrayVizComponent } from "./store/array.viz.component";

//  import { ArrayVizComponent }   from './array.viz.component';
//  import { TextVizComponent }   from './text.viz.component';
//  import { BarchartVizComponent }   from './barchart.viz.componet';
//  import { LinechartVizComponent }   from './linechart.viz.component';
//  import { RadarchartVizComponent }   from './radarchart.viz.component';
// import { HeroProfileComponent } from './hero-profile.component';
import { VisualisationDynamicComponent } from "./visualisation.dynamic.component";
@Injectable()
export class VizService {
  services: any = {
    array: new VisualisationDynamicComponent(ArrayVizComponent),
    text: new VisualisationDynamicComponent(ArrayVizComponent)
    //   text: new VisualisationDynamicComponent(TextVizComponent,   {headline: 'Hiring for several positions'}),
    //   barchart: new VisualisationDynamicComponent(BarchartVizComponent,   {headline: 'Hiring for several positions'}),
    //   linechart: new VisualisationDynamicComponent(LinechartVizComponent,   {headline: 'Hiring for several positions'}),
    //   radarchart: new VisualisationDynamicComponent(RadarchartVizComponent,   {headline: 'Hiring for several positions'})
  };
  addService(name: string, visService: VisualisationDynamicComponent) {
    this.services[name] = visService;
  }
  getVisualisations() {
    return this.services;
  }
}
