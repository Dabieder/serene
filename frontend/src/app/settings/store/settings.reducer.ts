import { Action } from "rxjs/internal/scheduler/Action";
import { SettingsActionUnion, SettingsActionTypes } from "./settings.action";
import { Settings } from "../models/settings";
import * as fromRoot from "../../reducers";
import { SettingsPageComponent } from "../components/settings-page.component";

export interface AppState extends fromRoot.AppState {
  settings: Settings;
}

// export interface SettingsState {
//   enableNotifications: boolean;
//   settings: Settings;
// }

const initialState: Settings = {
  usePushNotifications: false,
  useEMailNotifications: true,
  eMailAddress: "",
  dateFormat: "dd/MM/yyyy",
  language: "en"
};

export function reducer(
  state: any = initialState,
  action: SettingsActionUnion
): Settings {
  switch (action.type) {
    case SettingsActionTypes.SUBMIT_SETTINGS:
      return {
        ...state,
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

export const getSettings = (state: Settings) => state;
