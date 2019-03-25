import {
  Component,
  Input,
  ViewChild,
  Directive,
  ViewContainerRef,
  AfterViewInit,
  OnDestroy,
  ComponentFactoryResolver,
  Output,
  EventEmitter
} from "@angular/core";

import { VisualisationDynamicComponent } from "./visualisation.dynamic.component";

import { VizService } from "./visualisation.service";
import { VizComponentInterface } from "./visualisation.component.interface";

@Directive({
  selector: "[viz-host]"
})
export class VizDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}

@Component({
  selector: "visualisation",
  template: `
    <div>
      <ng-template viz-host style="width:100%;height:250px"></ng-template>
    </div>
  `
})
export class GenericVisualisationComponent implements AfterViewInit, OnDestroy {
  @Input()
  id: string;
  @Input()
  visData: string;
  @Input()
  config: any;
  @Output()
  public xapi: EventEmitter<void> = new EventEmitter();

  @ViewChild(VizDirective)
  vizHost: VizDirective;
  viz: VisualisationDynamicComponent;

  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver,
    private vizService: VizService
  ) {
    // private _componentFactoryResolver: ComponentFactoryResolver,
  }

  ngAfterViewInit() {
    this.loadComponent();
    // this.getAds();
  }

  ngOnDestroy() {}

  loadComponent() {
    setTimeout(() => {
      this.viz = this.vizService.getVisualisations()[this.id];
      const componentFactory = this._componentFactoryResolver.resolveComponentFactory(
        this.viz.component
      );
      const viewContainerRef = this.vizHost.viewContainerRef;
      viewContainerRef.clear();

      const componentRef = viewContainerRef.createComponent(componentFactory);
      (<VizComponentInterface>componentRef.instance).setVisualisationData(
        this.visData
      );
      if (this.config) {
        (<VizComponentInterface>componentRef.instance).setConfig(this.config);
      }
      if (this.xapi) {
        (<VizComponentInterface>componentRef.instance).setXapiEmit(
          xapiStatement => {
            this.xapi.emit(xapiStatement);
          }
        );
      }
    }, 100);
  }
}
