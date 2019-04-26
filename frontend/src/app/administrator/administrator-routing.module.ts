import { AuthenticationGuard } from "src/app/core/services";
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { AdministratorPageComponent } from "./components/administrator-page.component";

const routes: Routes = [
  {
    path: "**",
    component: AdministratorPageComponent
  },
  {
    path: "/home",
    component: AdministratorPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRoutingModule {}
