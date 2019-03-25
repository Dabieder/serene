import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { LearningPlan } from "../models/learning-plan";
import { MatSliderChange } from "@angular/material";

@Component({
  selector: "app-srl-monitor-subplan-item",
  templateUrl: "./monitor-subplan-item.component.html",
  styleUrls: ["./monitor-subplan-item.component.scss"]
})
export class MonitorSubplanItemComponent implements OnInit {
  @Input() learningPlan: LearningPlan;
  @Output()
  deleteItem = new EventEmitter<LearningPlan>();
  @Output()
  editItem = new EventEmitter<LearningPlan>();
  @Output()
  planChanged = new EventEmitter<LearningPlan>();
  constructor() {}

  ngOnInit() {}

  onRatingValueChanged(event: any) {}

  onSliderValueInput(event: MatSliderChange) {
    this.learningPlan.progress = event.value;
    this.learningPlan.completed = event.value >= 100;

    if (this.learningPlan.completed) {
      this.learningPlan.completionDate = new Date(Date.now());
    }
  }

  onSliderValueChange(event: MatSliderChange) {
    this.learningPlan.progress = event.value;
    this.planChanged.emit(this.learningPlan);
  }

  getSliderColor() {
    return this.learningPlan.progress >= 100 ? "primary" : "accent";
  }
}
