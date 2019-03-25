import { Action } from "@ngrx/store";
import { User } from "../models/user";
import { AuthProviders } from "../../core/services/authentication.service";
import { Settings } from "src/app/settings/models/settings";

export const enum AuthActionTypes {
  AUTHENTICATE = "[auth] Authenticate",
  AUTHENTICATE_THIRD_PARTY = "[auth] Authenticate Third Party",
  AUTHENTICATION_SUCCESS = "[auth] Authentication success",
  AUTHENTICATION_ERROR = "[auth] Authentication error",
  AUTHENTICATION_REDIRECT = "[auth] Authentication redirect",
  SIGN_OUT = "[auth] Sign out",
  SIGNED_OUT = "[auth] Signed out",
  SIGN_OUT_ERROR = "[auth] Sign out error",
  SIGN_OUT_SUCCESS = "[auth] Sign out success",
  SIGN_UP = "[auth] Sign up",
  SIGNED_UP = "[auth] Signed up",
  TOKEN_SESSION_LOGIN = "[auth] Token Session Login"
}

export class AuthenticateThirdPartyAction implements Action {
  public readonly type: string = AuthActionTypes.AUTHENTICATE_THIRD_PARTY;

  constructor(public payload: { serviceName: AuthProviders }) {}
}

export class AuthenticateAction implements Action {
  public readonly type: string = AuthActionTypes.AUTHENTICATE;

  constructor(public payload: { accountName: string; password: string }) {}
}

export class AuthenticationSuccessAction implements Action {
  public readonly type: string = AuthActionTypes.AUTHENTICATION_SUCCESS;

  constructor(public payload: { user: User; token?: any }) {}
}

export class AuthenticationErrorAction implements Action {
  public readonly type: string = AuthActionTypes.AUTHENTICATION_ERROR;

  constructor(public payload?: any) {}
}

export class AuthenticationRedirectAction implements Action {
  public readonly type = AuthActionTypes.AUTHENTICATION_REDIRECT;

  constructor(public payload?: any) {}
}

export class SignOutAction implements Action {
  public readonly type: string = AuthActionTypes.SIGN_OUT;

  constructor(public payload?: any) {}
}

export class SignOutSuccessAction implements Action {
  public readonly type: string = AuthActionTypes.SIGN_OUT_SUCCESS;

  constructor(public payload?: any) {}
}

export class SignoutErrorAction implements Action {
  public readonly type: string = AuthActionTypes.SIGN_OUT_ERROR;
  constructor(public payload?: any) {}
}

export class SignedOutAction implements Action {
  public readonly type: string = AuthActionTypes.SIGNED_OUT;

  constructor(public payload?: any) {}
}

export class SignUpAction implements Action {
  public readonly type: string = AuthActionTypes.SIGN_UP;

  constructor(public payload: { user: User }) {}
}

export class SignedUpAction implements Action {
  public readonly type: string = AuthActionTypes.SIGNED_UP;
  constructor(public payload: { user: User }) {}
}

export class TokenSessionLoginAction implements Action {
  public readonly type = AuthActionTypes.TOKEN_SESSION_LOGIN;
  constructor(public payload?: any) {}
}

export type AuthActionsUnion =
  | AuthenticateThirdPartyAction
  | AuthenticateAction
  | AuthenticationSuccessAction
  | AuthenticationErrorAction
  | AuthenticationRedirectAction
  | SignOutAction
  | SignedOutAction
  | SignOutSuccessAction
  | SignUpAction
  | SignedUpAction
  | TokenSessionLoginAction;
