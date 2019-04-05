import { Action } from "@ngrx/store";
import { Consent } from "src/app/settings/models/consent";

export const enum ConsentActionTypes {
  CONSENT_SUBMIT = "[user] Consent Submit",
  CONSENT_SUBMIT_SUCCESS = "[user] Consent Submit Success",
  CONSENT_SUBMITTED_ERROR = "[user] Consent Submitted Error",
  CONSENT_RETRIEVE = "[user] Consent Retrieve",
  CONSENT_RETRIEVE_SUCCESS = "[user] Consent Retrieve Success",
  CONSENT_RETRIEVE_ERROR = "[user] Consent Retrieve Error"
}

export class ConsentSubmitAction implements Action {
  public readonly type = ConsentActionTypes.CONSENT_SUBMIT;
  constructor(public payload: { consent: Consent }) {}
}

export class ConsentSubmitSuccessAction implements Action {
  public readonly type = ConsentActionTypes.CONSENT_SUBMIT_SUCCESS;
  constructor(public payload: { consent: Consent }) {}
}

export class ConsentSubmitErrorAction implements Action {
  public readonly type = ConsentActionTypes.CONSENT_SUBMIT_SUCCESS;
  constructor(public payload?: any) {}
}

export class ConsentRetrieveAction implements Action {
  public readonly type = ConsentActionTypes.CONSENT_RETRIEVE;
  constructor(public payload?: any) {}
}

export class ConsentRetrieveSuccessAction implements Action {
  public readonly type = ConsentActionTypes.CONSENT_RETRIEVE_SUCCESS;
  constructor(public payload: { consent: Consent }) {}
}

export class ConsentRetrieveErrorAction implements Action {
  public readonly type = ConsentActionTypes.CONSENT_RETRIEVE_ERROR;
  constructor(public payload?: any) {}
}

export type UserActionsUnion =
  | ConsentSubmitAction
  | ConsentSubmitSuccessAction
  | ConsentSubmitErrorAction
  | ConsentRetrieveAction
  | ConsentRetrieveSuccessAction
  | ConsentRetrieveErrorAction;
