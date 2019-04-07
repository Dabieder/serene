import { Component, OnInit } from "@angular/core";
import { SettingsService } from "../settings.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-privacy-settings",
  templateUrl: "./privacy-settings.component.html",
  styleUrls: ["./privacy-settings.component.css"]
})
export class PrivacySettingsComponent implements OnInit {
  courseData: any;
  selectedCourse: any = null;
  selectedDataItem: any = null;
  selectedRow = 0;

  constructor(
    private settingsService: SettingsService,
    private router: Router
  ) {}

  ngOnInit() {
    // this.settingsService.getSettingsData().subscribe(data => {
    //   this.courseData = data;
    //   this.selectedCourse = data[0];
    //   this.selectedDataItem = this.selectedCourse.data[0];
    // });
  }

  getWidgetsForSelected() {
    const widgetsForData = [];
    for (const w of this.selectedCourse.widgets) {
      for (const d of w.data) {
        if (d === this.selectedDataItem.name) {
          if (widgetsForData.findIndex(x => x.name === w.name) === -1) {
            widgetsForData.push(w);
          }
        }
      }
    }
    return widgetsForData;
  }

  highlightClickedRow = function(courseIndex: any, rowIndex: any) {
    this.selectedRow = rowIndex;
    this.selectedCourseIndex = courseIndex;
    this.selectedDataItem = this.selectedCourse.data[this.selectedRow];
  };

  contactPrivacy() {
    this.router.navigateByUrl("/contact");
  }

  onCourseSelectionChange(event: any) {}
}
