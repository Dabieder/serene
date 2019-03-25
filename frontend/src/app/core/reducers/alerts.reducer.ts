import { Alert } from "src/app/shared/models/alert";
import { AlertActionsUnion, AlertActionTypes } from "../actions/alerts.actions";

export interface AlertState {
  alerts: Alert[];
}

const initialState: AlertState = {
  alerts: []
};

export function reducer(
  state: AlertState = initialState,
  action: AlertActionsUnion
) {
  switch (action.type) {
    case AlertActionTypes.SHOW:
      const indexShow = state.alerts.findIndex(a => a === action.payload.alert);
      if (indexShow === -1) {
        return {
          ...state,
          alerts: [...state.alerts, action.payload.alert]
        };
      } else {
        return {
          ...state
        };
      }

    case AlertActionTypes.HIDE:
      const indexHide = state.alerts.findIndex(a => a === action.payload.alert);
      if (indexHide === -1) {
        return {
          ...state
        };
      } else {
        const alerts = [...state.alerts];
        alerts.splice(indexHide, 1);
        return {
          ...state,
          alerts
        };
      }
    default:
      return state;
  }
}
