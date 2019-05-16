import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatGridListModule,
  MatDialogModule,
  MatCardModule,
  MatMenuModule,
  MatIconModule,
  MatListModule,
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatDividerModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatSliderModule,
  MatInputModule,
  MatToolbarModule,
  MatExpansionModule,
  MatTabsModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatAutocompleteModule,
  MatTooltipModule,
  MAT_DATE_LOCALE
} from "@angular/material";
import { SettingsService } from "./settings/services/settings.service";

const MODULES = [
  [
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatDialogModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDividerModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatTabsModule,
    MatDatepickerModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatAutocompleteModule
  ]
];

@NgModule({
  imports: MODULES,
  exports: MODULES,
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      deps: [SettingsService],
      useFactory: settingsService => settingsService.getLanguage()
    }
  ]
})
export class MaterialModule {}
