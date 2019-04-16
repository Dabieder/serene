import { BrowserModule } from "@angular/platform-browser";
import { NgModule, LOCALE_ID } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";
import { HttpClientModule } from "@angular/common/http";
import { reducers } from "./reducers";
import { UserModule } from "./user/user.module";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import { DashboardModule } from "./dashboard/dashboard.module";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { VizModule } from "./viz/viz.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthenticationGuard } from "./core/services/authentication.guard";
import { UserService } from "./core/services/user.service";
import { ServiceWorkerModule } from "@angular/service-worker";
import { EffectsModule } from "@ngrx/effects";
import { SettingsModule } from "./settings/settings.module";
import { SharedModule } from "./shared/shared.module";
import { SettingsService } from "./settings/settings.service";
import { registerLocaleData } from "@angular/common";
import localeDe from "@angular/common/locales/de";
import { MaterialModule } from "./material.module";

registerLocaleData(localeDe, "de");

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    UserModule,
    SettingsModule,
    HttpClientModule,
    SharedModule,
    DashboardModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([]),
    VizModule,
    CoreModule.forRoot(),
    StoreDevtoolsModule.instrument({
      name: "TLA Dashboard",
      logOnly: environment.production
    }),
    StoreRouterConnectingModule.forRoot({
      stateKey: "router" // name of reducer key
    }),
    ServiceWorkerModule.register("sw-master.js", {
      enabled: environment.production
    })
  ],
  providers: [
    AuthenticationGuard,
    UserService,
    {
      provide: LOCALE_ID,
      deps: [SettingsService],
      useFactory: settingsService => settingsService.getLanguage()
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
