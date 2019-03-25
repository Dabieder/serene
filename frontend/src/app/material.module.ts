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
  MatAutocompleteModule
} from "@angular/material";

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
  exports: MODULES
  // providers: [
  //   {
  //     provide: DateAdapter,
  //     useClass: MomentDateAdapter,
  //     deps: [MAT_DATE_LOCALE]
  //   },
  //   {
  //     provide: MAT_DATE_FORMATS,
  //     useValue: MAT_MOMENT_DATE_FORMATS
  //   }
  // ]
})
export class MaterialModule {}
