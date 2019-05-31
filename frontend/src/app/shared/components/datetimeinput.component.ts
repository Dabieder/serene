import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  Input,
  EventEmitter,
  Output,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import flatpickr from "flatpickr";

@Component({
  selector: "app-datetimeinput",
  templateUrl: "./datetimeinput.component.html",
  styleUrls: ["./datetimeinput.component.scss"]
})
export class DatetimeinputComponent
  implements AfterViewInit, OnInit, OnDestroy, OnChanges {
  @ViewChild("flatpickr", { static: true }) flatpickrElement;
  dateTimePicker: any;

  @Input() dateFormat = "d.m.Y H:i";
  @Input() minDate = new Date();
  @Input() timeFormat = "";
  @Input() placeholder: String;

  @Input() date: Date;
  @Output() dateChange = new EventEmitter<Date>();

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    const nativeElement = this.flatpickrElement.nativeElement;

    if (typeof nativeElement === "undefined" || nativeElement === null) {
      throw new Error("Error: invalid input element specified");
    }

    const flatpickrOptions = {
      defaultDate: this.date,
      enableTime: true,
      dateFormat: this.dateFormat,
      time_24hr: true,
      minDate: this.minDate,
      onChange: this.eventOnChange,
      minuteIncrement: 5
    };

    // this.dateTimePicker = nativeElement.flatpickr({});
    this.dateTimePicker = flatpickr(nativeElement, flatpickrOptions);
    console.log("Date Time Picker: ", this.dateTimePicker);
  }

  onClick() {
    this.dateTimePicker.open();
  }

  ngOnDestroy() {
    if (this.dateTimePicker) {
      this.dateTimePicker.destroy();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("On Changes: ", changes);
  }

  protected eventOnChange = (
    selectedDates: Date[],
    dateStr: string,
    instance: Object
  ): void => {
    console.log("On Flatpickr Change");
    this.dateChange.emit(selectedDates[0]);
  }
}
