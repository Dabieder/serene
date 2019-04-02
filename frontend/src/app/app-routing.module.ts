import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthenticationGuard } from "./core/services";

const routes: Routes = [
  {
    path: "courses",
    loadChildren: "./course/course.module#CourseModule",
    canActivate: [AuthenticationGuard]
  },
  {
    path: "dashboard",
    loadChildren: "./dashboard/dashboard.module#DashboardModule",
    canActivate: [AuthenticationGuard]
  },
  { path: "user", loadChildren: "./user/user.module#UserModule" },
  {
    path: "serene",
    loadChildren: "./srl/srl-widget.module#SrlWidgetModule",
    canActivate: [AuthenticationGuard]
  },
  {
    path: "settings",
    loadChildren: "./settings/settings.module#SettingsModule",
    canActivate: [AuthenticationGuard]
  },
  {
    path: "**",
    redirectTo: "/serene/monitor",
    canActivate: [AuthenticationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
