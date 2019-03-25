import { Action } from "rxjs/internal/scheduler/Action";
import { SettingsActionUnion, SettingsActionTypes } from "./settings.action";
import { Settings } from "../models/settings";
import * as fromRoot from "../../reducers";

export interface AppState extends fromRoot.AppState {
  settings: SettingsState;
}

export interface SettingsState {
  enableNotifications: boolean;
  settings: Settings;
}

const initialState: SettingsState = {
  enableNotifications: true,
  settings: {
    enableNotifications: true
  }
};

export function reducer(
  state: any = initialState,
  action: SettingsActionUnion
): SettingsState {
  switch (action.type) {
    case SettingsActionTypes.SUBMIT_SETTINGS:
      return {
        ...state,
        enableNotifications: action.payload.settings.enableNotifications,
        settings: action.payload.settings
      };
    case SettingsActionTypes.FETCH_SETTINGS_SUCCESS:
      return {
        ...state,
        settings: action.payload.settings
      };
    default:
      return state;
  }
}
