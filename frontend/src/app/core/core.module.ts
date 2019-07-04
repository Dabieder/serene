import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { UserService } from "./services/user.service";
import { ApiService } from "./services/api.service";
import { JwtService } from "./services/jwt.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpTokenInterceptor } from "./interceptors/http.token.interceptor";
import { EffectsModule } from "@ngrx/effects";
import { RouterEffects } from "./effects/router.effects";
import { ShowAuthedDirective } from "./directives/show-authed.directive";
import { SidenavComponent } from "./layout/sidenav.component";
import { ToolbarComponent } from "./layout/toolbar.component";
import { HeaderService } from "./services/header.service";
import { AuthenticationService } from "./services/authentication.service";
import { ToolbarDropdownComponent } from "./layout/toolbar-dropdown.component";
import { RouteLoggingService } from "./services/route-logging.service";
import { HealthCheckService } from "./services/health-check.service";
import { HealthCheckEffects } from "./effects/health-check.effects";
import { PushNotificationService } from "./services/push-notification.service";
import { UpdateService } from "./services/update.service";
import { MaterialModule } from "../material.module";
import { CustomIconService } from "./services/custom-icon.service";
import { DropdownDirective } from "./directives/dropdown.directive";

export const COMPONENTS = [
  ShowAuthedDirective,
  SidenavComponent,
  DropdownDirective,
  ToolbarComponent,
  ToolbarDropdownComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    EffectsModule.forFeature([RouterEffects, HealthCheckEffects])
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
/*
  Initialize all services here which are singleton services and have no
  other explicit place to be initialized
 */
export class CoreModule {
  constructor(
    private healthCheckService: HealthCheckService,
    private pushNotificationService: PushNotificationService,
    private updateService: UpdateService,
    private routeLoggingService: RouteLoggingService,
    private customIconService: CustomIconService
  ) {}

  static forRoot() {
    return {
      ngModule: CoreModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpTokenInterceptor,
          multi: true
        },
        UserService,
        ApiService,
        JwtService,
        HeaderService,
        AuthenticationService,
        RouteLoggingService,
        HealthCheckService
      ]
    };
  }
}
