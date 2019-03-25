import { Action } from "@ngrx/store";
import { HealthCheck } from "src/app/shared/models/health-check";

export enum HealthActionTypes {
  HEALTH_CHECK = "[Health] Health Check",
  HEALTH_CHECK_SUCCESS = "[Health] Health Check Success",
  HEALTH_CHECK_ERROR = "[Health] Health Check Error"
}

export class HealthCheckAction implements Action {
  public readonly type = HealthActionTypes.HEALTH_CHECK;
  constructor(public payload?: any) {}
}

export class HealthCheckSuccessAction implements Action {
  public readonly type = HealthActionTypes.HEALTH_CHECK_SUCCESS;
  constructor(public payload?: any) {}
}

export class HealthCheckErrorAction implements Action {
  public readonly type = HealthActionTypes.HEALTH_CHECK_ERROR;
  constructor(public payload: { healthCheck: HealthCheck }) {}
}

export type HealthCheckActionsUnion =
  | HealthCheckAction
  | HealthCheckSuccessAction
  | HealthCheckErrorAction;
