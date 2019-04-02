import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { SrlWidgetState } from "../store";
import { ShowPlanDialogAction } from "../store/srl-widget.actions";
import { LearningPlan } from "../models/learning-plan";

@Component({
  selector: "app-srl-mobile-nav",
  templateUrl: "./srl-mobile-nav.component.html",
  styleUrls: ["./srl-mobile-nav.component.scss"]
})
export class SrlMobileNavComponent implements OnInit {
  constructor(private store: Store<SrlWidgetState>) {}

  ngOnInit() {}

  openPlanDialog() {
    const learningPlan = LearningPlan.createForDate(new Date(Date.now()));
    this.store.dispatch(
      new ShowPlanDialogAction({
        learningPlan
      })
    );
  }
}
