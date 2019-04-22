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
import { ShowAuthedDirective } from "./show-authed.directive";
import { SidenavComponent } from "./layout/sidenav.component";
import { ToolbarComponent } from "./layout/toolbar.component";
import { HeaderService } from "./services/header.service";
import { AuthenticationService } from "./services/authentication.service";
import { ShowIfCourseSelectedDirective } from "./course-selected.directive";

import { ToolbarDropdownComponent } from "./layout/toolbar-dropdown.component";
import { RouteLoggingService } from "./services/route-logging.service";
import { HealthCheckService } from "./services/health-check.service";
import { HealthCheckEffects } from "./effects/health-check.effects";
import { PushNotificationService } from "./services/push-notification.service";
import { UpdateService } from "./services/update.service";
import { MaterialModule } from "../material.module";

export const COMPONENTS = [
  ShowAuthedDirective,
  ShowIfCourseSelectedDirective,
  SidenavComponent,
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
export class CoreModule {
  constructor(
    private healthCheckService: HealthCheckService,
    private pushNotificationService: PushNotificationService,
    private updateService: UpdateService,
    private routeLoggingService: RouteLoggingService
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
