import { Action } from "@ngrx/store";

export enum LayoutActionTypes {
  ShowSidenav = "[Layout] Show Sidenav",
  HideSidenav = "[Layout] Hide Sidenav",
  ToggleSidenav = "[Layout] Toggle Sidenav",
  ShowToolbar = "[Layout] Show Toolbar",
  HideToolbar = "[Layout] Hide Toolbar"
}

export class ShowSidenavAction implements Action {
  readonly type = LayoutActionTypes.ShowSidenav;
}

export class HideSidenavAction implements Action {
  readonly type = LayoutActionTypes.HideSidenav;
}

export class ToggleSidenavAction implements Action {
  readonly type = LayoutActionTypes.ToggleSidenav;
}

export class ShowToolbarAction implements Action {
  readonly type = LayoutActionTypes.ShowToolbar;
}

export class HideToolbarAction implements Action {
  readonly type = LayoutActionTypes.HideToolbar;
}

export type LayoutActionsUnion =
  | ShowSidenavAction
  | HideSidenavAction
  | ToggleSidenavAction
  | ShowToolbarAction
  | HideToolbarAction;
