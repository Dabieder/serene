import * as fromRoot from "../../../../reducers";
import * as fromSrlWidget from "./srl-widget.reducer";
import { ActionReducerMap, createSelector } from "@ngrx/store";
import * as moment from "moment";

export interface AppState extends fromRoot.AppState {
  srlWidget: SrlWidgetState;
}

export interface SrlWidgetState {
  srlWidget: fromSrlWidget.State;
}

export const reducers: ActionReducerMap<SrlWidgetState> = {
  srlWidget: fromSrlWidget.reducer
};

export const getWidgetState = (state: SrlWidgetState) => state.srlWidget;

export const getSelectedWeek = createSelector(
  getWidgetState,
  state => {
    return state.selectedWeek;
  }
);

export const getSelectedDay = createSelector(
  getWidgetState,
  state => {
    return state.selectedDay;
  }
);

export const getError = createSelector(
  getWidgetState,
  state => state.error
);

export const getIsLoading = createSelector(
  getWidgetState,
  state => state.loading
);

export const getCanEditData = createSelector(
  getSelectedWeek,
  week => {
    const today = moment(new Date(Date.now()));
    const endOfSelectedWeek = moment(week.endDate);
    const difference = endOfSelectedWeek.diff(today, "days");
    // If the current date is further in the past than the selected week start date, then data editing is not allowed
    if (difference < 0) {
      return false;
    }
    return true;
  }
);

export const getReasons = createSelector(
  getWidgetState,
  state => state.reasons
);

export const getPlanDialogOpen = createSelector(
  getWidgetState,
  state => state.planDialogOpen
);

export const getSurveyResults = createSelector(
  getWidgetState,
  state => state.surveyResults
);

export const getLearningPlans = createSelector(
  getWidgetState,
  state => state.learningPlans
);

export const getSelectedLearningPlan = createSelector(
  getWidgetState,
  state => state.selectedLearningPlan
);

export const getMonitorings = createSelector(
  getWidgetState,
  state => state.monitorings
);
