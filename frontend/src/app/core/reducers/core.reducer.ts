import {
  UserActionsUnion,
  UserActionTypes
} from "../../user/store/user.actions";
import {
  AuthActionTypes,
  AuthActionsUnion
} from "src/app/user/store/auth.actions";
import { HealthCheck } from "src/app/shared/models/health-check";

export interface CoreState {
  loading: boolean;
  health: HealthCheck;
}

const initialState: CoreState = {
  loading: false,
  health: {
    connected: false,
    message: ""
  }
};

export type ActionsUnion = UserActionsUnion | AuthActionsUnion;

export function reducer(state: any = initialState, action: ActionsUnion) {
  switch (action.type) {
    case AuthActionTypes.AUTHENTICATE:
    case UserActionTypes.CONSENT_RETRIEVE:
    case UserActionTypes.CONSENT_SUBMIT:
      return Object.assign({}, state, {
        loading: true
      });
    case AuthActionTypes.SIGN_OUT_SUCCESS:
    case UserActionTypes.CONSENT_RETRIEVE_SUCCESS:
    case AuthActionTypes.AUTHENTICATION_SUCCESS:
      return Object.assign({}, state, {
        loading: false
      });
    default:
      return state;
  }
}

export const loading = (state: CoreState) => state.loading;
