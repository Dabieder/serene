import { ActionReducerMap } from "@ngrx/store";
import * as fromRoot from "../../reducers";

import * as fromCourses from "./course.reducer";

export interface CoursesState {
  courses: fromCourses.State;
}

export interface State extends fromRoot.AppState {
  courses: CoursesState;
}

export const reducers: ActionReducerMap<CoursesState> = {
  courses: fromCourses.reducer
};

export const selectCourses = (state: State) => state.courses.courses.courses;
