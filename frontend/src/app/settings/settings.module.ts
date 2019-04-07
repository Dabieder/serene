import { NgModule } from "@angular/core";
import { PrivacySettingsComponent } from "./components/privacy-settings.component";
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
import { SettingsRoutingModule } from "./settings-routing.module";
import { ConsentPageComponent } from "./components/consent-page.component";
import { ConsentItemComponent } from "./components/consent-item.component";

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    SettingsRoutingModule,
    StoreModule.forFeature("settings", reducer),
    EffectsModule.forFeature([SettingsEffects]),
    MaterialModule,
    SharedModule
  ],
  declarations: [
    PrivacySettingsComponent,
    NotificationSettingsComponent,
    SettingsPageComponent,
    ConsentPageComponent,
    ConsentItemComponent
  ],
  exports: [ConsentPageComponent]
})
export class SettingsModule {}
