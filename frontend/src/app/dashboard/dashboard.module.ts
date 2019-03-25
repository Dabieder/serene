import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { DashboardEffects } from "./effects/dashboard.effects";
import { QueryEffects } from "./effects/query.effects";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardPageComponent } from "./pages/dashboard-page/dashboard-page.component";
import { reducers } from "./reducers";
import { DashboardRowComponent } from "./components/dashboard-row/dashboard-row.component";
import { DashboardColumnComponent } from "./components/dashboard-column/dashboard-column.component";
import { SidebarPagesMenuComponent } from "./components/sidebar-pages-menu/sidebar-pages-menu.component";
import { PageResolver } from "./routing/page-resolver";
import { VizModule } from "../viz/viz.module";

import { WidgetComponent } from "./components/widget/widget.component";
import { DashboardMainPageComponent } from "./pages/dashboard-main-page/dashboard-main-page.component";
import { DashboardCourseComponent } from "./pages/dashboard-course/dashboard-course.component";
import { SharedModule } from "../shared/shared.module";
import { XapiEffects } from "./effects/xapi.effects";

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature("dashboard", reducers),
    // EffectsModule.forRoot([]),
    EffectsModule.forFeature([DashboardEffects, QueryEffects, XapiEffects]),
    DashboardRoutingModule,
    VizModule,
    SharedModule
  ],
  exports: [SidebarPagesMenuComponent],
  providers: [PageResolver],
  declarations: [
    DashboardCourseComponent,
    DashboardMainPageComponent,
    DashboardPageComponent,
    DashboardRowComponent,
    DashboardColumnComponent,
    SidebarPagesMenuComponent,
    WidgetComponent
  ]
})
export class DashboardModule {}
