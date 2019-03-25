import { UserActionsUnion, UserActionTypes } from "./user.actions";
import { User } from "../models/user";
import { Consent } from "../models/consent";
import { createSelector } from "@ngrx/store";
import * as fromRoot from "../../reducers";
import { AuthActionTypes, AuthActionsUnion } from "./auth.actions";

export interface AppState extends fromRoot.AppState {
  user: UserState;
}

export interface UserState {
  authenticated: boolean;
  loading: boolean;
  user: User;
  consent: Consent;
}

const initialState: UserState = {
  loading: false,
  authenticated: false,
  user: null,
  consent: null
};

// TODO: Split in auth and auser state

export function reducer(
  state: any = initialState,
  action: UserActionsUnion | AuthActionsUnion
): UserState {
  switch (action.type) {
    case AuthActionTypes.AUTHENTICATE:
    case UserActionTypes.CONSENT_RETRIEVE:
    case UserActionTypes.CONSENT_SUBMIT:
      return Object.assign({}, state, {
        loading: true
      });

    case AuthActionTypes.AUTHENTICATION_ERROR:
      return Object.assign({}, state, {
        authenticated: false,
        error: action.payload.error.message,
        loading: false
      });

    case UserActionTypes.CONSENT_RETRIEVE_SUCCESS:
      return Object.assign({}, state, {
        consent: action.payload.consent,
        loading: false
      });

    case UserActionTypes.CONSENT_SUBMIT_SUCCESS:
      return Object.assign({}, state, {
        consent: action.payload.consent,
        loading: false
      });

    case AuthActionTypes.SIGNED_UP:
    case AuthActionTypes.AUTHENTICATION_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        authenticated: true,
        user: action.payload.user
      });
    case AuthActionTypes.SIGN_UP:
    case AuthActionTypes.SIGN_OUT:
      return Object.assign({}, state, {
        error: null,
        loading: true
      });

    case AuthActionTypes.SIGN_OUT_SUCCESS:
      return Object.assign({}, state, {
        authenticated: false,
        error: null,
        user: null,
        loading: false
      });

    default:
      return state;
  }
}

export const isAuthenticated = (state: UserState) => state.authenticated;

export const getAuthenticatedUser = (state: UserState) => state.user;

export const getConsent = (state: UserState) => state.consent;

export const isLoading = (state: UserState) => state.loading;

export const userState = (state: UserState) => state;

export const getConsentUser = createSelector(
  userState,
  getConsent
);

export const getIsLoadingUser = createSelector(
  userState,
  isLoading
);
