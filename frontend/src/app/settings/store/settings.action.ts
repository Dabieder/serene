import { Action } from "@ngrx/store";
import { Settings } from "../models/settings";

export enum SettingsActionTypes {
  SUBMIT_SETTINGS = "[settings] Submit Settings",
  SUBMIT_SETTINGS_SUCCESS = "[settings] Submit Settings Success",
  SUBMIT_SETTINGS_ERROR = "[settings] Submit Settings Error",
  FETCH_SETTINGS = "[settings] Fetch Settings",
  FETCH_SETTINGS_SUCCESS = "[settings] Fetch Settings Success",
  FETCH_SETTINGS_ERROR = "[settings] Fetch Settings Error"
}

export class SubmitSettingsAction implements Action {
  public readonly type = SettingsActionTypes.SUBMIT_SETTINGS;

  constructor(public payload: { settings: Settings }) {}
}

export class SubmitSettingsSuccessAction implements Action {
  public readonly type = SettingsActionTypes.SUBMIT_SETTINGS_SUCCESS;

  constructor(public payload?: any) {}
}

export class SubmitSettingsErrorAction implements Action {
  public readonly type = SettingsActionTypes.SUBMIT_SETTINGS_ERROR;

  constructor(public payload?: any) {}
}

export class FetchSettingsAction implements Action {
  public readonly type = SettingsActionTypes.FETCH_SETTINGS;

  constructor(public payload?: any) {}
}

export class FetchSettingsSuccessAction implements Action {
  public readonly type = SettingsActionTypes.FETCH_SETTINGS_SUCCESS;

  constructor(public payload: { settings: Settings }) {}
}

export class FetchSettingsErrorAction implements Action {
  public readonly type = SettingsActionTypes.FETCH_SETTINGS_ERROR;

  constructor(public payload?: any) {}
}

export type SettingsActionUnion =
  | SubmitSettingsAction
  | SubmitSettingsSuccessAction
  | SubmitSettingsErrorAction
  | FetchSettingsAction
  | FetchSettingsErrorAction
  | FetchSettingsSuccessAction;
