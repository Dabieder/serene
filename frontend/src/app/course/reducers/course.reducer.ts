import {
  CourseActionTypes,
  CourseActionsUnion
} from "../actions/course.actions";

import { Course } from "../models/course";

const mockCourses: Course[] = [
  {
    title: "Computer Science",
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    endDate: "0",
    startDate: "0"
  }
];

export interface State {
  loaded: boolean;
  loading: boolean;
  courses: Course[];
}

const initialState: State = {
  loaded: false,
  loading: false,
  courses: mockCourses
};

export function reducer(
  state = initialState,
  action: CourseActionsUnion
): State {
  switch (action.type) {
    case CourseActionTypes.Load: {
      return {
        ...state,
        loading: true
      };
    }

    case CourseActionTypes.LoadSuccess: {
      return {
        loaded: true,
        loading: false,
        courses: action.payload
      };
    }

    default: {
      return state;
    }
  }
}

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getCourses = (state: State) => state.courses;
