import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdministratorRoutingModule } from "./administrator-routing.module";
import { AdministratorPageComponent } from "./components/administrator-page.component";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "../material.module";

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    AdministratorRoutingModule,
    MaterialModule
  ],
  declarations: [AdministratorPageComponent]
})
export class AdministratorModule {
  constructor() {}
}
