import { Action } from "@ngrx/store";

export enum XapiActionTypes {
  SubmitXapi = "[Xapi] Send Xapi To Server",
  SubmitXapiSuccess = "[Xapi] Success Submitting Xapi",
  SubmitXapiError = "[Xapi] Error Submitting Xapi"
}

export class SubmitXapi implements Action {
  readonly type = XapiActionTypes.SubmitXapi;
  constructor(public payload: any) {}
}

export class SubmitXapiSuccess implements Action {
  readonly type = XapiActionTypes.SubmitXapiSuccess;
  constructor(public payload?: any) {}
}

export class SubmitXapiError implements Action {
  readonly type = XapiActionTypes.SubmitXapiError;
  constructor(public payload: { error: any }) {}
}

export type XapiActionsUnion = SubmitXapi | SubmitXapiError | SubmitXapiSuccess;
