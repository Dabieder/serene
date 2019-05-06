import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-learning-strategy-select",
  templateUrl: "./learning-strategy-select.component.html",
  styleUrls: ["./learning-strategy-select.component.scss"]
})
export class LearningStrategySelectComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  dropdownClick($event: any) {
    $event.stopPropagation();
  }
}
