import { Action } from "@ngrx/store";
import { User } from "../models/user";
import { Consent } from "../../settings/models/consent";

export const enum UserActionTypes {
  CONSENT_SUBMIT = "[user] Consent Submit",
  CONSENT_SUBMIT_SUCCESS = "[user] Consent Submit Success",
  CONSENT_SUBMITTED_ERROR = "[user] Consent Submitted Error",
  CONSENT_RETRIEVE = "[user] Consent Retrieve",
  CONSENT_RETRIEVE_SUCCESS = "[user] Consent Retrieve Success",
  CONSENT_RETRIEVE_ERROR = "[user] Consent Retrieve Error",
  FETCH_USER_DATA = "[user] Fetch User Data",
  FETCH_USER_DATA_SUCCESS = "[user] Fetch User Data Success",
  FETCH_USER_DATA_ERROR = "[user] Fetch User Data Error"
}
export class ConsentSubmitAction implements Action {
  public readonly type = UserActionTypes.CONSENT_SUBMIT;
  constructor(public payload: { consent: Consent }) {}
}

export class ConsentSubmitSuccessAction implements Action {
  public readonly type = UserActionTypes.CONSENT_SUBMIT_SUCCESS;
  constructor(public payload: { consent: Consent }) {}
}

export class ConsentSubmitErrorAction implements Action {
  public readonly type = UserActionTypes.CONSENT_SUBMIT_SUCCESS;
  constructor(public payload?: any) {}
}

export class ConsentRetrieveAction implements Action {
  public readonly type = UserActionTypes.CONSENT_RETRIEVE;
  constructor(public payload?: { user: User }) {}
}

export class ConsentRetrieveSuccessAction implements Action {
  public readonly type = UserActionTypes.CONSENT_RETRIEVE_SUCCESS;
  constructor(public payload: { consent: Consent }) {}
}

export class ConsentRetrieveErrorAction implements Action {
  public readonly type = UserActionTypes.CONSENT_RETRIEVE_ERROR;
  constructor(public payload?: any) {}
}

export type UserActionsUnion =
  | ConsentSubmitAction
  | ConsentSubmitSuccessAction
  | ConsentSubmitErrorAction
  | ConsentRetrieveAction
  | ConsentRetrieveSuccessAction
  | ConsentRetrieveErrorAction;
