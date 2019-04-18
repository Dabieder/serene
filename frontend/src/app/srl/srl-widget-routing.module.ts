import { PlanDialogComponent } from "./plan/plan-dialog.component";
import { AuthenticationGuard } from "src/app/core/services";
import { Routes, RouterModule } from "@angular/router";
import { MonitoringPageComponent } from "./monitor/monitoring-page.component";
import { ReflectionPageComponent } from "./reflect/reflection-page.component";
import { NgModule } from "@angular/core";
import { SrlWidgetComponent } from "./srl-widget.component";

const routes: Routes = [
  {
    path: "",
    component: SrlWidgetComponent,
    children: [
      {
        path: "monitor",
        component: MonitoringPageComponent
      },
      {
        path: "reflect",
        component: ReflectionPageComponent
      },
      {
        path: "plan/:id",
        component: PlanDialogComponent
      },
      {
        path: "new",
        component: PlanDialogComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SrlWidgetRoutingModule {}
