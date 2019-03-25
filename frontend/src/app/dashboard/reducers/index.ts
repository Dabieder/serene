import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap
} from "@ngrx/store";
import * as fromRoot from "../../reducers";

import * as fromDashboard from "./dashboard.page.reducer";
// import * as fromWidget from './widget.reducer';
import * as fromQueries from "./query.reducer";

export interface DashboardState {
  pages: fromDashboard.State;
  // widgets: fromWidget.State;
  queryResults: fromQueries.State;
}

export interface State extends fromRoot.AppState {
  dashboard: DashboardState;
}

export const reducers: ActionReducerMap<DashboardState> = {
  pages: fromDashboard.reducer,
  // widgets: fromWidget.reducer,
  queryResults: fromQueries.reducer
};
export const getDashboard = createFeatureSelector<DashboardState>("dashboard");

// export const selectWidgets = (state: State) => {
//     return state.dashboard.widgets};

// export const selectPages = (state: State) => state.dashboard.pages.pages;
export const pages = (state: State) => state.dashboard.pages;

export const getDashboardPages = createSelector(getDashboard, dashboard => {
  return dashboard.pages;
});

export const selectPagesForCourse = createSelector(
  fromRoot.selectCurrentCourseId,
  getDashboardPages,
  (currentCourse, dashboard) => {
    if (!dashboard) {
      return undefined;
    }
    if (!dashboard.pagesMap[currentCourse]) {
      return undefined;
    }

    return dashboard.pagesMap[currentCourse];
  }
);

export const getDashboardPagesMap = createSelector(
  getDashboardPages,
  dashboardPages => {
    return dashboardPages.pagesMap;
  }
);

export const getRows = createSelector(getDashboardPages, dashboardPages => {
  return dashboardPages.rows;
});
export const getColumns = createSelector(getDashboardPages, dashboardPages => {
  return dashboardPages.columns;
});
// export const selectPagesIds = createSelector(
//     selectPages,
//     (pages: any) => pages.map(page => page.id)
// )

export const currentPageNew = createSelector(
  getDashboardPages,
  getRows,
  getColumns,
  fromRoot.selectCurrentPageId,
  fromRoot.selectCurrentCourseId,
  (dashboardPages, rows, columns, currentPage, currentCourse) => {
    if (
      !currentCourse ||
      !currentPage ||
      !dashboardPages.pagesMap[currentCourse]
    ) {
      return undefined;
    }
    const result = { ...dashboardPages.pagesMap[currentCourse][currentPage] };
    if (result && rows) {
      result.rows = rows[currentPage];
      if (result.rows && columns) {
        result.rows.map(row => {
          row["columns"] = columns[row.id];
        });
      }
    }
    return result;
  }
);

export const getResult = (queryId: string) =>
  createSelector(getDashboard, db => {
    return db.queryResults.results[queryId];
  });

export const getAllResult = createSelector(getDashboard, db => {
  return db.queryResults.results;
});
