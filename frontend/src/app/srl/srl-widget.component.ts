import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store, select } from "@ngrx/store";
import {
  SelectedWeekChangeAction,
  RequestDataFromBackendAction,
  ShowPlanDialogAction
} from "./store/srl-widget.actions";
import {
  SrlWidgetState,
  getIsLoading,
  getSurveyResults,
  getPlanDialogOpen,
  getLearningPlans
} from "./store";
import { BaseComponent } from "src/app/core/base-component";
import { takeUntil } from "rxjs/operators";
import { Week } from "./models/week";
import {
  SrlWidgetXapiService,
  ObjectIds,
  ItemTypes
} from "./services/srl-widget-x-api.service";
import { MatTabChangeEvent } from "@angular/material";
import { LearningPlan } from "./models/learning-plan";

@Component({
  selector: "app-srl-widget",
  templateUrl: "./srl-widget.component.html",
  styleUrls: ["./srl-widget.component.scss"]
})
export class SrlWidgetComponent extends BaseComponent
  implements OnDestroy, OnInit {
  selectedPlan: LearningPlan;
  selectedWeek: Week;
  selectedTabIndex = 0;
  learningPlans: LearningPlan[];
  planDialogOpen$ = this.store.pipe(select(getPlanDialogOpen));
  loading$ = this.store.pipe(select(getIsLoading));
  surveyResults$ = this.store.pipe(select(getSurveyResults));

  constructor(
    private store: Store<SrlWidgetState>,
    private srlXApiService: SrlWidgetXapiService
  ) {
    super();
  }

  ngOnInit(): void {
    this.store.dispatch(new RequestDataFromBackendAction());

    this.store
      .pipe(
        select(getLearningPlans),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(learningPlans => {
        if (learningPlans) {
          this.learningPlans = [...learningPlans];
        }
      });
  }

  onSelectedWeekChange(week: Week) {
    this.dispatchWeekChange(week);
  }

  onTabIndexChange(event: any, tabIndex: number) {
    this.selectedTabIndex = tabIndex;
  }

  onSelectedTabChange(tabChangeEvent: MatTabChangeEvent) {
    this.onSelectedPageChange(tabChangeEvent.tab.textLabel);
  }

  onSelectedPageChange(changeEvent: string) {
    const statement = this.srlXApiService.getNavigationStatement(
      ObjectIds.Navigation,
      ItemTypes.NavigationWeekChange,
      changeEvent
    );
    this.srlXApiService.submitStatement(statement);
  }

  selectCurrentWeek() {
    this.dispatchWeekChange(new Week(new Date(Date.now())));
  }

  dispatchWeekChange(week: Week) {
    if (!this.selectedWeek.equals(week)) {
      this.store.dispatch(
        new SelectedWeekChangeAction({ selectedWeek: { ...week } })
      );
    }
  }

  openPlanDialog() {
    const learningPlan = LearningPlan.createForDate(new Date(Date.now()));
    this.store.dispatch(new ShowPlanDialogAction({ learningPlan }));
  }
}
