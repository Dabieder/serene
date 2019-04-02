import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { LearningPlan } from "../models/learning-plan";
import { MatSliderChange } from "@angular/material";

@Component({
  selector: "app-srl-monitor-plan-item",
  templateUrl: "./monitor-plan-item.component.html",
  styleUrls: ["./monitor-plan-item.component.scss"]
})
export class MonitorPlanItemComponent implements OnInit {
  @Input() learningPlan: LearningPlan;
  @Output()
  deleteItem = new EventEmitter<LearningPlan>();
  @Output()
  editItem = new EventEmitter<LearningPlan>();
  @Output()
  planCompleted = new EventEmitter<LearningPlan>();
  @Output()
  planChanged = new EventEmitter<LearningPlan>();
  constructor() {}

  ngOnInit() {}

  onRatingValueChanged(event: any) {}

  onSliderValueInput(event: MatSliderChange) {
    this.learningPlan.progress = event.value;
  }

  onSliderValueChange(event: MatSliderChange) {
    this.learningPlan.progress = event.value;
    this.learningPlan.completed = event.value >= 100;
    if (this.learningPlan.completed) {
      this.learningPlan.completionDate = new Date(Date.now());
    } else {
      this.learningPlan.completionDate = null;
    }

    this.planChanged.emit(this.learningPlan);
  }

  onSubPlanChanged(plan: LearningPlan) {
    this.learningPlan.progress =
      this.learningPlan.subPlans.reduce((a, b) => a + b.progress, 0) /
      this.learningPlan.subPlans.length;
    this.learningPlan.completed =
      this.learningPlan.subPlans.filter(x => !x.completed).length === 0;
    this.planChanged.emit(this.learningPlan);
  }

  deleteClick() {
    this.deleteItem.emit(this.learningPlan);
  }

  editClick() {
    this.editItem.emit(this.learningPlan);
  }

  onCompletedClick(event: any) {
    this.planCompleted.emit(this.learningPlan);
  }

  getSliderColor() {
    return this.learningPlan.progress >= 100 ? "primary" : "accent";
  }
}
