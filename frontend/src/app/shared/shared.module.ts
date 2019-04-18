import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MenuItemComponent } from "./components/menu-item.component";
import { LoadingIndicatorComponent } from "./components/loading-indicator.component";
import { NavDropdownComponent } from "./components/dropdown/nav-dropdown.component";
import { RouterModule } from "@angular/router";
import { AlertsComponent } from "./components/alerts/alerts.component";
import { NotificationDialogComponent } from "./dialogs/notification-dialog.component";
import { MaterialModule } from "../material.module";
import { MobileNavComponent } from "./components/mobile-nav.component";
import { InitialSettingsDialogComponent } from "./dialogs/initial-settings-dialog.component";

@NgModule({
  imports: [CommonModule, RouterModule, MaterialModule],
  declarations: [
    MenuItemComponent,
    MenuItemComponent,
    LoadingIndicatorComponent,
    NavDropdownComponent,
    AlertsComponent,
    NotificationDialogComponent,
    MobileNavComponent,
    InitialSettingsDialogComponent
  ],
  exports: [
    MenuItemComponent,
    MenuItemComponent,
    LoadingIndicatorComponent,
    NavDropdownComponent,
    AlertsComponent,
    NotificationDialogComponent,
    MobileNavComponent,
    InitialSettingsDialogComponent
  ],
  entryComponents: [NotificationDialogComponent, InitialSettingsDialogComponent]
})
export class SharedModule {}
