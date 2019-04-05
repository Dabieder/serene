import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { CourseService } from "./services/course.service";
import { DashboardService } from "./services/dashboard.service";
import { UserService } from "./services/user.service";
import { ApiService } from "./services/api.service";
import { JwtService } from "./services/jwt.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpTokenInterceptor } from "./interceptors/http.token.interceptor";
import { EffectsModule } from "@ngrx/effects";
import { RouterEffects } from "./effects/router.effects";
import { QueryService } from "./services/query.service";
import { ShowAuthedDirective } from "./show-authed.directive";
import { SidenavComponent } from "./layout/sidenav.component";
import { ToolbarComponent } from "./layout/toolbar.component";
import { HeaderService } from "./services/header.service";
import { AuthenticationService } from "./services/authentication.service";
import { ShowIfCourseSelectedDirective } from "./course-selected.directive";

import { ToolbarDropdownComponent } from "./layout/toolbar-dropdown.component";
import { RouteService } from "./services/route.service";
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
    private updateService: UpdateService
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
        CourseService,
        DashboardService,
        QueryService,
        UserService,
        ApiService,
        JwtService,
        HeaderService,
        AuthenticationService,
        RouteService,
        HealthCheckService
      ]
    };
  }
}
