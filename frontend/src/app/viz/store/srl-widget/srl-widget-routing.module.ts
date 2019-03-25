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
        component: MonitoringPageComponent,
        canActivate: [AuthenticationGuard]
      },
      {
        path: "reflect",
        component: ReflectionPageComponent,
        canActivate: [AuthenticationGuard]
      },
      {
        path: "plan",
        component: PlanDialogComponent,
        canActivate: [AuthenticationGuard]
      },
      {
        path: "new",
        component: PlanDialogComponent,
        canActivate: [AuthenticationGuard]
      }
    ],
    canActivate: [AuthenticationGuard]
  },
  {
    path: "home",
    component: SrlWidgetComponent,
    canActivate: [AuthenticationGuard]
    // children: [
    //   {
    //     path: "monitor",
    //     component: MonitoringPageComponent,
    //     canActivate: [AuthenticationGuard]
    //   },
    //   {
    //     path: "reflect",
    //     component: ReflectionPageComponent,
    //     canActivate: [AuthenticationGuard]
    //   }
    // ]
  },
  {
    path: "widget",
    component: SrlWidgetComponent,
    canActivate: [AuthenticationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SrlWidgetRoutingModule {}
