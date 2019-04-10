import { Action } from "@ngrx/store";

export const enum CoreActionTypes {
  LOADING_START = "[Core] Loading Start",
  LOADING_END = "[Core] Loading End",
  SUBMISSION_START = "[Core] Submission Start",
  SUBMISSION_END = "[Core] Submission End"
}

export class LoadingStartAction implements Action {
  public readonly type = CoreActionTypes.LOADING_START;

  constructor(public payload?: any) {}
}

export class LoadingEndAction implements Action {
  public readonly type = CoreActionTypes.LOADING_END;

  constructor(public payload?: any) {}
}

export class SubmissionStartAction implements Action {
  public readonly type = CoreActionTypes.SUBMISSION_START;

  constructor(public payload?: any) {}
}

export class SubmissionEndAction implements Action {
  public readonly type = CoreActionTypes.SUBMISSION_END;

  constructor(public payload?: any) {}
}

export type CoreActionsUnion =
  | LoadingStartAction
  | LoadingEndAction
  | SubmissionStartAction
  | SubmissionEndAction;
