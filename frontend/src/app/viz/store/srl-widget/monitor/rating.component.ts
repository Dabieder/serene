import { Component, Input, Output, EventEmitter } from "@angular/core";
import { MatSliderChange } from "@angular/material";

@Component({
  selector: "app-srl-rating",
  templateUrl: "./rating.component.html",
  styleUrls: ["./rating.component.scss"]
})
export class RatingComponent {
  @Input()
  value: number;
  @Output()
  valueChange = new EventEmitter<number>();

  constructor() {}

  onSliderValueInput(event: MatSliderChange) {
    this.value = event.value;
  }

  onSliderValueChange(event: MatSliderChange) {
    this.valueChange.emit(event.value);
  }

  overachieve() {
    this.value = 100;
  }
}
