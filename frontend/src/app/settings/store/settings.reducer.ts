import { SettingsActionUnion, SettingsActionTypes } from "./settings.action";
import { Settings } from "../models/settings";
import * as fromRoot from "../../reducers";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { loading } from "src/app/core/reducers/core.reducer";

export interface AppState extends fromRoot.AppState {
  settings: SettingsState;
}

export interface SettingsState {
  loading: boolean;
  submitting: boolean;
  settings: Settings;
}

const initialState: SettingsState = {
  settings: {
    usePushNotifications: false,
    useEMailNotifications: false,
    email: "",
    dateFormat: "dd/MM/yyyy",
    language: "en",
    firstLogIn: true
  },
  loading: false,
  submitting: false
};

export function reducer(
  state: any = initialState,
  action: SettingsActionUnion
): SettingsState {
  switch (action.type) {
    case SettingsActionTypes.SUBMIT_SETTINGS:
      return {
        ...state,
        settings: { ...state.settings, ...action.payload.settings },
        submitting: true
      };
    case SettingsActionTypes.SUBMIT_SETTINGS_SUCCESS:
      return {
        ...state,
        submitting: false,
        loading: false
      };
    case SettingsActionTypes.FETCH_SETTINGS:
      return {
        ...state,
        loading: true
      };
    case SettingsActionTypes.FETCH_SETTINGS_ERROR:
      return {
        ...state,
        loading: false
      };
    case SettingsActionTypes.FETCH_SETTINGS_SUCCESS:
      return {
        ...state,
        settings: { ...state.settings, ...action.payload.settings },
        loading: false,
        submitting: false
      };
    default:
      return state;
  }
}

export const getSettingsState = createFeatureSelector<SettingsState>(
  "settings"
);

export const getSettings = createSelector(
  getSettingsState,
  state => state.settings
);
