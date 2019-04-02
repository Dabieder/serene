import { NgModule } from "@angular/core";
import { PrivacySettingsComponent } from "./components/privacy-settings.component";
import { Routes, RouterModule } from "@angular/router";
import { MaterialModule } from "../material.module";
import { CommonModule } from "@angular/common";
import { CoreModule } from "../core/core.module";
import { NotificationSettingsComponent } from "./components/notification-settings.component";
import { SettingsPageComponent } from "./components/settings-page.component";
import { StoreModule } from "@ngrx/store";
import { reducer } from "./store/settings.reducer";
import { EffectsModule } from "@ngrx/effects";
import { SettingsEffects } from "./store/settings.effects";
import { SharedModule } from "../shared/shared.module";

const routes: Routes = [
  {
    path: "settings/privacy",
    component: PrivacySettingsComponent
  },
  {
    path: "**",
    component: SettingsPageComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature("settings", reducer),
    EffectsModule.forFeature([SettingsEffects]),
    MaterialModule,
    SharedModule
  ],
  declarations: [
    PrivacySettingsComponent,
    NotificationSettingsComponent,
    SettingsPageComponent
  ]
})
export class SettingsModule {}
