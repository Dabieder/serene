import {
  UserActionsUnion,
  UserActionTypes
} from "../../user/store/user.actions";
import {
  AuthActionTypes,
  AuthActionsUnion
} from "src/app/user/store/auth.actions";
import { HealthCheck } from "src/app/shared/models/health-check";
import { CoreActionsUnion, CoreActionTypes } from "../actions/core.actions";

export interface CoreState {
  loading: boolean;
  submitting: boolean;
  health: HealthCheck;
}

const initialState: CoreState = {
  loading: false,
  submitting: false,
  health: {
    connected: false,
    message: ""
  }
};

export type ActionsUnion =
  | UserActionsUnion
  | AuthActionsUnion
  | CoreActionsUnion;

export function reducer(state: any = initialState, action: ActionsUnion) {
  switch (action.type) {
    case CoreActionTypes.LOADING_START:
      return {
        ...state,
        loading: true
      };
    case CoreActionTypes.LOADING_END:
      return {
        ...state,
        loading: false
      };
    case CoreActionTypes.SUBMISSION_START:
      return {
        ...state,
        submitting: true
      };
    case CoreActionTypes.SUBMISSION_END:
      return {
        ...state,
        submitting: false
      };
    case AuthActionTypes.AUTHENTICATE:
      return Object.assign({}, state, {
        loading: true
      });
    case AuthActionTypes.SIGN_OUT_SUCCESS:
    case AuthActionTypes.AUTHENTICATION_ERROR:
    case AuthActionTypes.AUTHENTICATION_SUCCESS:
      return Object.assign({}, state, {
        loading: false
      });
    default:
      return state;
  }
}

export const loading = (state: CoreState) => state.loading;
