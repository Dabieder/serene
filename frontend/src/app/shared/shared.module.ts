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

@NgModule({
  imports: [CommonModule, RouterModule],
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
    AlertsComponent
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
    AlertsComponent
  ]
})
export class SharedModule {}
