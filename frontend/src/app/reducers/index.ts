import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector
} from "@ngrx/store";

import { routerReducer } from "@ngrx/router-store";
import * as fromRouter from "@ngrx/router-store";
import * as fromLayout from "../core/reducers/layout.reducer";
import * as user from "../user/store/user.reducers";
import * as core from "../core/reducers/core.reducer";
import * as settings from "../settings/store/settings.reducer";
import * as alerts from "../core/reducers/alerts.reducer";
import { Settings } from "../settings/models/settings";

export interface AppState {
  layout: fromLayout.State;
  router: fromRouter.RouterReducerState;
  user: user.UserState;
  core: core.CoreState;
  settings: settings.SettingsState;
  alerts: alerts.AlertState;
}

export const reducers: ActionReducerMap<AppState> = {
  layout: fromLayout.reducer,
  router: routerReducer,
  user: user.reducer,
  core: core.reducer,
  settings: settings.reducer,
  alerts: alerts.reducer
};

export const getLayoutState = (state: AppState) => state.layout;

export const getRouterState = (state: AppState) => state.router;

export const getUserState = (state: AppState) => state.user;

export const getCoreState = (state: AppState) => state.core;

export const getAlertsState = (state: AppState) => state.alerts;

export const getSettingsState = (state: AppState) => state.settings;

export const getSettings = createSelector(
  getSettingsState,
  settingsState => settingsState.settings
);

export const getAlerts = createSelector(
  getAlertsState,
  al => al.alerts
);

export const getShowToolbar = createSelector(
  getLayoutState,
  lay => lay.showToolbar
);

export const getRouter = createFeatureSelector<fromRouter.RouterReducerState>(
  "router"
);

export const getAuthenticatedUser = createSelector(
  getUserState,
  user.getAuthenticatedUser
);

export const getConsent = createSelector(
  getUserState,
  user.getConsent
);

export const getCurrentUrl = createSelector(
  getRouterState,
  (state: fromRouter.RouterReducerState) => state.state.url
);

export const selectCurrentPageId = createSelector(
  getRouter,
  router => router.state.root.firstChild.firstChild.params.pageId
);

export const selectCurrentCourseId = createSelector(
  getRouterState,
  router => {
    if (!router) {
      return undefined;
    }
    return router.state.root.firstChild.firstChild.params.courseId;
  }
);

export const isLoading = createSelector(
  getCoreState,
  getUserState,
  (coreState, userState) => {
    return coreState.loading || userState.loading;
  }
);

export const getUser = createSelector(
  getUserState,
  userState => userState.user
);

export const getIsAuthenticated = createSelector(
  getUserState,
  userState => userState.authenticated
);
