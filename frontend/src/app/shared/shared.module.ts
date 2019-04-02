import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ContentRowComponent } from "./components/content-row.component";
import { ContentHeaderComponent } from "./components/content-header.component";
import { CardComponent } from "./components/card.component";
import { TableComponent } from "./components/table.component";
import { MenuItemComponent } from "./components/menu-item.component";
import { LoadingIndicatorComponent } from "./components/loading-indicator.component";
import { ExpanderComponent } from "./components/expander/expander.component";
import { NavDropdownComponent } from "./components/dropdown/nav-dropdown.component";
import { RouterModule } from "@angular/router";
import { AlertsComponent } from "./components/alerts/alerts.component";
import { NotificationDialogComponent } from "./components/dialogs/notification-dialog.component";
import { MaterialModule } from "../material.module";

@NgModule({
  imports: [CommonModule, RouterModule, MaterialModule],
  declarations: [
    ContentRowComponent,
    ContentHeaderComponent,
    CardComponent,
    TableComponent,
    MenuItemComponent,
    CardComponent,
    ContentHeaderComponent,
    MenuItemComponent,
    TableComponent,
    LoadingIndicatorComponent,
    ExpanderComponent,
    NavDropdownComponent,
    AlertsComponent,
    NotificationDialogComponent
  ],
  exports: [
    ContentRowComponent,
    ContentHeaderComponent,
    CardComponent,
    TableComponent,
    MenuItemComponent,
    CardComponent,
    ContentHeaderComponent,
    MenuItemComponent,
    TableComponent,
    LoadingIndicatorComponent,
    ExpanderComponent,
    NavDropdownComponent,
    AlertsComponent,
    NotificationDialogComponent
  ],
  entryComponents: [NotificationDialogComponent]
})
export class SharedModule {}
