import { NgModule } from "@angular/core";
import { SettingsPageComponent } from "./components/settings-page.component";
import { NotificationSettingsComponent } from "./components/notification-settings.component";
import { AuthenticationGuard } from "../core/services";
import { Routes, RouterModule } from "@angular/router";
import { ConsentPageComponent } from "./components/consent-page.component";

const routes: Routes = [
  {
    path: "",
    component: SettingsPageComponent,
    children: [
      {
        path: "notifications",
        component: NotificationSettingsComponent,
        canActivate: [AuthenticationGuard]
      },
      {
        path: "consent",
        component: ConsentPageComponent,
        canActivate: [AuthenticationGuard]
      }
    ],
    canActivate: [AuthenticationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {}
