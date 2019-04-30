import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import flatpickr from "flatpickr";

@Component({
  selector: "app-datetimeinput",
  templateUrl: "./datetimeinput.component.html",
  styleUrls: ["./datetimeinput.component.scss"]
})
export class DatetimeinputComponent implements AfterViewInit {
  @ViewChild("flatpickr") flatpickrRef;
  dateTimePicker: any;

  constructor() {}

  ngAfterViewInit() {
    flatpickr(this.flatpickrRef.nativeElement, {});
    this.dateTimePicker = this.flatpickrRef.nativeElement.flatpickr({});
    console.log("Date Time Picker: ", this.dateTimePicker);
  }
}
