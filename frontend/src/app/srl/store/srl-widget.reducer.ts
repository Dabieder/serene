import {
  SrlWidgetActionsUnion,
  SrlWidgetActionTypes
} from "./srl-widget.actions";
import { Week } from "../models/week";
import { RatingItem } from "../models/rating-item";
import { MetaSettings } from "../models/meta-settings";
import { LearningPlan } from "../models/learning-plan";
import { Monitoring } from "../models/monitoring";

export interface SrlState {
  selectedWeek: Week;
  selectedDay: Date;
  reasons: RatingItem[];
  error: any;
  loading: boolean;
  metaSettings: MetaSettings;
  surveyResults: any;
  planDialogOpen: boolean;
  learningPlans: LearningPlan[];
  selectedLearningPlan: LearningPlan;
  monitorings: Monitoring[];
}

const todayDate = new Date(Date.now());
const initialState: SrlState = {
  monitorings: [],
  selectedWeek: new Week(todayDate),
  selectedDay: todayDate,
  error: null,
  reasons: [],
  learningPlans: [],
  loading: false,
  metaSettings: new MetaSettings(),
  surveyResults: {},
  planDialogOpen: false,
  selectedLearningPlan: null
};

export function reducer(
  state = initialState,
  action: SrlWidgetActionsUnion
): SrlState {
  switch (action.type) {
    case SrlWidgetActionTypes.SELECTED_WEEK_CHANGE:
      return {
        ...state,
        selectedWeek: action.payload.selectedWeek
      };
    case SrlWidgetActionTypes.SELECTED_DAY_CHANGE:
      return {
        ...state,
        selectedDay: action.payload.selectedDay
      };
    case SrlWidgetActionTypes.SUBMIT_STATEMENT_ERROR:
      return {
        ...state,
        error: action.payload.error
      };
    case SrlWidgetActionTypes.REQUEST_DATA_FROM_BACKEND:
      return {
        ...state,
        loading: true
      };
    case SrlWidgetActionTypes.REQUEST_DATA_FROM_BACKEND_ERROR:
      return {
        ...state,
        error: action.payload.error,
        loading: false
      };
    case SrlWidgetActionTypes.SHOW_PLAN_DIALOG:
      return {
        ...state,
        planDialogOpen: true,
        selectedLearningPlan: action.payload.learningPlan
      };
    case SrlWidgetActionTypes.HIDE_PLAN_DIALOG:
      return {
        ...state,
        planDialogOpen: false
      };
    case SrlWidgetActionTypes.SUBMIT_NEW_PLAN:
      const planIndex = state.learningPlans.findIndex(
        x => x.id === action.payload.plan.id
      );
      if (planIndex >= 0) {
        state.learningPlans[planIndex] = action.payload.plan;
      } else {
        state.learningPlans.push(action.payload.plan);
      }
      return {
        ...state,
        planDialogOpen: false,
        learningPlans: [...state.learningPlans]
      };
    case SrlWidgetActionTypes.SUBMIT_MONITORING:
      const monitoringsSubmit = [...state.monitorings];
      monitoringsSubmit.push({ ...action.payload.monitoring });
      return {
        ...state,
        monitorings: monitoringsSubmit
      };
    case SrlWidgetActionTypes.REQUEST_DATA_FROM_BACKEND_SUCCESS:
      return {
        ...state,
        reasons: action.payload.reasons,
        surveyResults: action.payload.surveyResults,
        learningPlans: action.payload.learningPlans,
        monitorings: action.payload.monitorings,
        loading: false
      };
    case SrlWidgetActionTypes.DELETE_PLAN:
      const index = state.learningPlans.findIndex(
        x => x.id === action.payload.plan.id
      );
      if (index >= 0) {
        state.learningPlans.splice(index, 1);
      }
      return {
        ...state,
        learningPlans: [...state.learningPlans]
      };
    case SrlWidgetActionTypes.UPDATE_PLANS:
      return {
        ...state,
        learningPlans: [...action.payload.plans]
      };
    case SrlWidgetActionTypes.COMPLETE_PLAN:
      const idx = state.learningPlans.findIndex(
        x => x.id === action.payload.plan.id
      );
      if (idx >= 0) {
        state.learningPlans[idx] = action.payload.plan;
      }
      return {
        ...state,
        learningPlans: [...state.learningPlans]
      };
    default:
      return state;
  }
}
