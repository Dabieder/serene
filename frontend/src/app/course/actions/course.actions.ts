import { Action } from '@ngrx/store';
import { Course } from '../models/course';

export enum CourseActionTypes {
    Load = '[Course] Load',
    LoadSuccess = '[Course] Load Success',
}

export class Load implements Action {
    readonly type = CourseActionTypes.Load;
    constructor() { }
}

export class LoadSuccess implements Action {
    readonly type = CourseActionTypes.LoadSuccess;

    constructor(public payload: Course[]) { }
}

export type CourseActionsUnion =
    |Load | LoadSuccess;
