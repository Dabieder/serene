import { Action } from "@ngrx/store";
import { NavigationExtras } from "@angular/router";

export enum ActionTypes {
  GO = "[Router] Go",
  BACK = "[Router] Back",
  FORWARD = "[Router] Forward",

  OPEN_COURSE = "[Router] Open Course",
  OPEN_COURSE_COMPLETE = "[Router] Open Course Complete"
}

export class Go implements Action {
  readonly type = ActionTypes.GO;

  constructor(
    public payload: {
      path: any[];
      query?: object;
      extras?: NavigationExtras;
    }
  ) {}
}

export class Back implements Action {
  readonly type = ActionTypes.BACK;
}

export class Forward implements Action {
  readonly type = ActionTypes.FORWARD;
}

export class OpenCourse implements Action {
  readonly type = ActionTypes.OPEN_COURSE;

  constructor(public key: string) {}
}

export class OpenCourseComplete implements Action {
  readonly type = ActionTypes.OPEN_COURSE_COMPLETE;
  constructor(public projectId: string) {}
}

export type RouterActionsUnion =
  | Go
  | Back
  | Forward
  | OpenCourse
  | OpenCourseComplete;
