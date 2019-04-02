import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReflectionPageComponent } from "./reflect/reflection-page.component";
import { SrlWidgetComponent } from "./srl-widget.component";
import { ChartsModule } from "ng2-charts";
import { LearningGoalChartComponent } from "./reflect/visualizations/learning-goal-chart.component";
import { SrlDimensionsChartComponent } from "./reflect/visualizations/srl-dimensions-chart.component";
import { WeekSelectionComponent } from "./components/week-selection.component";
import { MonitoringPageComponent } from "./monitor/monitoring-page.component";
import { ReasonComponent } from "./monitor/reason.component";
import { TrackingItemComponent } from "./components/tracking-item.component";
import { RatingComponent } from "./monitor/rating.component";
import { reducer } from "./store/srl-widget.reducer";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { SrlWidgetEffects } from "./store/srl-widget.effects";
import { WeekDisplayPipe } from "./pipes/WeekDisplayPipe";
import { TimeDisplayPipe } from "./pipes/time-display-pipe";
import { RatingItemComponent } from "./components/rating-item.component";
import { WeekOverviewComponent } from "./components/week-overview.component";
import { ReasonOverviewComponent } from "./reflect/visualizations/reason-overview.component";
import { SharedModule } from "src/app/shared/shared.module";
import { EditOverlayComponent } from "./components/edit-overlay";
import { SrlWidgetCardComponent } from "./components/srl-widget-card.component";
import { ModalWindowComponent } from "./components/modal-window.component";
import { PlanDialogComponent } from "./plan/plan-dialog.component";
import { SubPlanItemComponent } from "./plan/subplan-item.component";
import { MonitorPlanItemComponent } from "./monitor/monitor-plan-item.component";
import { SrlMobileNavComponent } from "./nav/srl-mobile-nav.component";
import { PlanDateComponent } from "./plan/plan-date.component";
import { TimeSelectComponent } from "./components/time-select.component";
import { AssistancePanelComponent } from "./reflect/assistance-panel.component";
import { MonitorSubplanItemComponent } from "./monitor/monitor-subplan-item.component";
import { CompletedPlanChartComponent } from "./reflect/visualizations/completed-plan-chart.component";
import { CoreModule } from "src/app/core/core.module";
import { SrlWidgetRoutingModule } from "./srl-widget-routing.module";
import { RouterModule } from "@angular/router";
import { SummaryComponent } from "./reflect/visualizations/summary.component";
import { MaterialModule } from "../material.module";

@NgModule({
  imports: [
    RouterModule,
    SrlWidgetRoutingModule,
    CommonModule,
    StoreModule.forFeature("srlWidget", reducer),
    EffectsModule.forFeature([SrlWidgetEffects]),
    ChartsModule,
    MaterialModule,
    SharedModule,
    CoreModule
  ],
  declarations: [
    ReflectionPageComponent,
    SrlWidgetComponent,
    LearningGoalChartComponent,
    SrlDimensionsChartComponent,
    WeekSelectionComponent,
    MonitoringPageComponent,
    ReasonComponent,
    TrackingItemComponent,
    RatingComponent,
    WeekDisplayPipe,
    WeekOverviewComponent,
    RatingItemComponent,
    ReasonOverviewComponent,
    EditOverlayComponent,
    SrlWidgetCardComponent,
    ModalWindowComponent,
    PlanDialogComponent,
    SubPlanItemComponent,
    MonitorPlanItemComponent,
    SrlMobileNavComponent,
    PlanDateComponent,
    TimeSelectComponent,
    TimeDisplayPipe,
    AssistancePanelComponent,
    MonitorSubplanItemComponent,
    CompletedPlanChartComponent,
    SummaryComponent
  ],
  exports: [
    ReflectionPageComponent,
    SrlWidgetComponent,
    LearningGoalChartComponent,
    SrlDimensionsChartComponent,
    WeekSelectionComponent,
    MonitoringPageComponent,
    ReasonComponent,
    TrackingItemComponent,
    RatingComponent,
    WeekDisplayPipe,
    RatingItemComponent,
    TimeDisplayPipe
  ]
})
export class SrlWidgetModule {
  constructor() {}

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: SrlWidgetModule
    };
  }
}
