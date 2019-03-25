import { Action } from "@ngrx/store";
import { Alert } from "src/app/shared/models/alert";

export const enum AlertActionTypes {
  SHOW = "[Alert] Show",
  HIDE = "[Alert] Hide"
}

export class ShowAlertAction implements Action {
  public readonly type = AlertActionTypes.SHOW;

  constructor(public payload: { alert: Alert }) {}
}

export class HideAlertAction implements Action {
  public readonly type = AlertActionTypes.HIDE;

  constructor(public payload?: { alert: Alert }) {}
}

export type AlertActionsUnion = ShowAlertAction | HideAlertAction;
