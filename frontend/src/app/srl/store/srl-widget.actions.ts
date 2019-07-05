import { Action } from "@ngrx/store";
import { Week } from "../models/week";
import { RatingItem } from "../models/rating-item";
import { MetaSettings } from "../models/meta-settings";
import { SurveyResult } from "../models/survey-result";
import { LearningPlan } from "../models/learning-plan";
import { Monitoring } from "../models/monitoring";

export enum SrlWidgetActionTypes {
  SELECTED_WEEK_CHANGE = "[planningWidget] Selected Week Change",
  SELECTED_DAY_CHANGE = "[planningWidget] Selected Day Change",
  SUBMIT_STATEMENT = "[planningWidget] Submit Statement",
  SUBMIT_STATEMENT_SUCCESS = "[planningWidget] Submit Statement Success",
  SUBMIT_STATEMENT_ERROR = "[planningWidget] Submit Statement Error",
  REQUEST_DATA_FROM_BACKEND = "[planningWidget] Request Data From Backend",
  REQUEST_DATA_FROM_BACKEND_SUCCESS = "[planningWidget] Request Data From Backend Success",
  REQUEST_DATA_FROM_BACKEND_ERROR = "[planningWidget] Request Data From Backend Error",
  SUBMIT_DATA_TO_BACKEND = "[planningWidget] Submit Data To Backend",
  SUBMIT_DATA_TO_BACKEND_SUCCESS = "[planningWidget] Submit Data To Backend Success",
  SUBMIT_DATA_TO_BACKEND_ERROR = "[planningWidget] Submit Data To Backend Error",
  SHOW_PLAN_DIALOG = "[planningWidget] Show Plan Dialog",
  HIDE_PLAN_DIALOG = "[planningWidget] Hide Plan Dialog",
  SUBMIT_NEW_PLAN = "[planningWidget] Submit New Plan",
  DELETE_PLAN = "[planningWidget] Delete Plan",
  SUBMIT_MONITORING = "[planningWidget] Submit Monitoring",
  UPDATE_PLANS = "[planningWidget] Update Plans",
  COMPLETE_PLAN = "[planningWidget] Complete Plan",
  FILTER_ACTIVATE = "[planningWidget] Filter Activated",
  FILTER_DEACTIVATE = "[planningWidget] Filter Deactivated"
}

export class SelectedWeekChangeAction implements Action {
  public readonly type = SrlWidgetActionTypes.SELECTED_WEEK_CHANGE;

  constructor(public payload: { selectedWeek: Week }) {}
}

export class SelectedDayChangeAction implements Action {
  public readonly type = SrlWidgetActionTypes.SELECTED_DAY_CHANGE;

  constructor(public payload: { selectedDay: Date }) {}
}

export class SubmitStatementAction implements Action {
  public readonly type = SrlWidgetActionTypes.SUBMIT_STATEMENT;

  constructor(public payload: { statement: any }) {}
}

export class SubmitStatementSuccessAction implements Action {
  public readonly type = SrlWidgetActionTypes.SUBMIT_STATEMENT_SUCCESS;

  constructor(public payload?: any) {}
}

export class SubmitStatementErrorAction implements Action {
  public readonly type = SrlWidgetActionTypes.SUBMIT_STATEMENT_ERROR;

  constructor(public payload: { error: any }) {}
}

export class RequestDataFromBackendAction implements Action {
  public readonly type = SrlWidgetActionTypes.REQUEST_DATA_FROM_BACKEND;

  constructor(public payload?: any) {}
}

export class RequestDataFromBackendSuccessAction implements Action {
  public readonly type = SrlWidgetActionTypes.REQUEST_DATA_FROM_BACKEND_SUCCESS;

  constructor(
    public payload: {
      reasons: RatingItem[];
      learningPlans: LearningPlan[];
      metaSettings: MetaSettings;
      surveyResults: SurveyResult;
      monitorings: Monitoring[];
    }
  ) {}
}

export class RequestDataFromBackendErrorAction implements Action {
  public readonly type = SrlWidgetActionTypes.REQUEST_DATA_FROM_BACKEND_ERROR;

  constructor(public payload?: any) {}
}

export class SubmitDataToBackendAction implements Action {
  public readonly type = SrlWidgetActionTypes.SUBMIT_DATA_TO_BACKEND;

  constructor(public payload: { data: any }) {}
}

export class SubmitDataToBackendSuccessAction implements Action {
  public readonly type = SrlWidgetActionTypes.SUBMIT_DATA_TO_BACKEND_SUCCESS;

  constructor(public payload?: any) {}
}

export class SubmitDataToBackendErrorAction implements Action {
  public readonly type = SrlWidgetActionTypes.SUBMIT_DATA_TO_BACKEND_ERROR;

  constructor(public payload?: any) {}
}

export class ShowPlanDialogAction implements Action {
  public readonly type = SrlWidgetActionTypes.SHOW_PLAN_DIALOG;

  constructor(
    public payload: {
      learningPlan: LearningPlan;
    }
  ) {}
}

export class HidePlanDialogAction implements Action {
  public readonly type = SrlWidgetActionTypes.HIDE_PLAN_DIALOG;

  constructor(public payload?: any) {}
}

export class SubmitNewPlanAction implements Action {
  public readonly type = SrlWidgetActionTypes.SUBMIT_NEW_PLAN;

  constructor(
    public payload: {
      plan: LearningPlan;
    }
  ) {}
}

export class SubmitMonitoringAction implements Action {
  public readonly type = SrlWidgetActionTypes.SUBMIT_MONITORING;

  constructor(public payload: { monitoring: Monitoring }) {}
}

export class UpdatePlansAction implements Action {
  public readonly type = SrlWidgetActionTypes.UPDATE_PLANS;

  constructor(public payload: { plans: LearningPlan[] }) {}
}

export class DeletePlanAction implements Action {
  public readonly type = SrlWidgetActionTypes.DELETE_PLAN;

  constructor(
    public payload: {
      plan: LearningPlan;
    }
  ) {}
}

export class CompletePlanAction implements Action {
  public readonly type = SrlWidgetActionTypes.COMPLETE_PLAN;

  constructor(public payload: { plan: LearningPlan }) {}
}

export class ActivateFilterAction implements Action {
  public readonly type = SrlWidgetActionTypes.FILTER_ACTIVATE;

  constructor(public payload: { filter: string }) {}
}

export class DeActivateFilterAction implements Action {
  public readonly type = SrlWidgetActionTypes.FILTER_DEACTIVATE;

  constructor(public payload: { filter: string }) {}
}

export type SrlWidgetActionsUnion =
  | CompletePlanAction
  | DeletePlanAction
  | HidePlanDialogAction
  | RequestDataFromBackendAction
  | RequestDataFromBackendSuccessAction
  | RequestDataFromBackendErrorAction
  | SelectedWeekChangeAction
  | SelectedDayChangeAction
  | ShowPlanDialogAction
  | SubmitMonitoringAction
  | SubmitDataToBackendSuccessAction
  | SubmitDataToBackendErrorAction
  | SubmitDataToBackendAction
  | SubmitNewPlanAction
  | SubmitStatementAction
  | SubmitStatementErrorAction
  | SubmitStatementSuccessAction
  | UpdatePlansAction;
