import { Component, OnInit, EventEmitter, Input, Output } from "@angular/core";
import { TrackingItem } from "../models/tracking-item";
import { BaseComponent } from "src/app/core/base-component";
import { RatingItem } from "../models/rating-item";
import { LearningPlan } from "../models/learning-plan";

@Component({
  selector: "app-reason",
  templateUrl: "./reason.component.html",
  styleUrls: ["./reason.component.scss"]
})
export class ReasonComponent extends BaseComponent implements OnInit {
  @Input()
  reasons: RatingItem[] = [];
  customReason: string;

  _plan: LearningPlan;
  get plan(): LearningPlan {
    return this._plan;
  }
  @Input("plan")
  set plan(plan: LearningPlan) {
    this._plan = plan;
    if (plan) {
      this.reasons = plan.reasons;
      this.customReason = plan.comment;
    }
  }

  @Output()
  reasonsChange = new EventEmitter<RatingItem>();

  constructor() {
    super();
  }

  ngOnInit() {}

  onCustomReasonChange(event: any) {
    // TODO: Create custom rating item
    this.submitReasonsChange(null);
  }

  onRatingItemChanged(event: RatingItem) {
    this.submitReasonsChange(event);
  }

  submitReasonsChange(reason: RatingItem) {
    this.reasonsChange.emit(reason);
  }
}
