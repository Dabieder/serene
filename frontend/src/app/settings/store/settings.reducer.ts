import { SettingsActionUnion, SettingsActionTypes } from "./settings.action";
import { Settings } from "../models/settings";
import * as fromRoot from "../../reducers";
import { createFeatureSelector, createSelector } from "@ngrx/store";

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
    language: "en"
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
        settings: { ...state.settings, ...action.payload.settings }
      };
    case SettingsActionTypes.FETCH_SETTINGS_SUCCESS:
      return {
        ...state,
        settings: { ...state.settings, ...action.payload.settings }
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
