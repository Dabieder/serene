import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ConsentPageComponent } from "./settings/components/consent-page.component";
import { SignInPageComponent } from "./user/pages/signin-page.component";
import { AuthenticationGuard } from "./core/services/authentication.guard";

const routes: Routes = [
  {
    path: "admin",
    loadChildren: "./administrator/administrator.module#AdministratorModule",
    canActivate: [AuthenticationGuard]
  },
  {
    path: "courses",
    loadChildren: "./course/course.module#CourseModule",
    canActivate: [AuthenticationGuard]
  },
  {
    path: "consent",
    component: ConsentPageComponent,
    canActivate: [AuthenticationGuard]
  },
  { path: "signin", component: SignInPageComponent },
  {
    path: "serene",
    loadChildren: "./srl/srl-widget.module#SrlWidgetModule",
    canActivate: [AuthenticationGuard]
  },
  {
    path: "settings",
    loadChildren: "./settings/settings.module#SettingsModule",
    // loadChildren: () =>
    //   import("./settings/settings.module").then(m => m.SettingsModule),
    canActivate: [AuthenticationGuard]
  },
  {
    path: "**",
    redirectTo: "/serene/monitor",
    canActivate: [AuthenticationGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled" })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
