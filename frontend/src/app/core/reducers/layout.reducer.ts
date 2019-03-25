import {
  LayoutActionTypes,
  LayoutActionsUnion
} from "../actions/layout.actions";

export interface State {
  showSidenav: boolean;
  showToolbar: boolean;
}

const initialState: State = {
  showSidenav: true,
  showToolbar: true
};

export function reducer(
  state: State = initialState,
  action: LayoutActionsUnion
): State {
  switch (action.type) {
    case LayoutActionTypes.HideSidenav:
      return { ...state, showSidenav: false };
    case LayoutActionTypes.ShowSidenav:
      return { ...state, showSidenav: true };
    case LayoutActionTypes.HideToolbar:
      return { ...state, showToolbar: false };
    case LayoutActionTypes.ShowToolbar:
      return { ...state, showToolbar: true };
    case LayoutActionTypes.ToggleSidenav:
      const showSidenav = !state.showSidenav;
      return { ...state, showSidenav};
    default:
      return state;
  }
}

export const getShowSidenav = (state: State) => state.showSidenav;

export const getShowToolbar = (state: State) => state.showToolbar;
