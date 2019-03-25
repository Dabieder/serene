import {
  DashboardActionTypes,
  DashboardActionsUnion
} from "../actions/dashboard.actions";

import {
  DashboardRowMap,
  DashboardPageColumnMap,
  DashboardPageMap
} from "../models/dashboard";

export interface State {
  // selectedPage:string;
  loaded: boolean;
  loading: boolean;
  // pages: DashboardPage[];
  pagesMap: DashboardPageMap;
  rows: DashboardRowMap;
  columns: DashboardPageColumnMap;
}

const initialState: State = {
  // selectedPage: "",
  loaded: false,
  loading: false,
  // pages: [],

  pagesMap: {
    "3fa85f64-5717-4562-b3fc-2c963f66afa6": {
      page1: {
        id: "index",
        name: "Main page"
      },
      index: {
        id: "page1",
        name: "Personal indicators"
      },
      ioanapage: {
        id: "ioanapage",
        name: "Widget IO"
      }
    }
  },
  rows: {
    index: [
      {
        id: "c1_p1_r1",
        columns: [
          {
            id: "c1_p1_r1_c1",
            width: 10,
            classes: "col-lg-10 col-xs-10",
            widgetId: "srl-widget",
            useCard: false,
            widgets: [
              {
                type: "srlWidget",
                queryId: "queryId3",
                resultsFormat: "format1",
                config: {}
              }
            ],
            title: "SRL Widget"
          }
        ]
      }
    ]
  },
  columns: {
    c1_p1_r1: [
      {
        id: "c1_p1_r1_c2",
        width: 10,
        classes: "col-lg-10",
        widgetId: "w1",
        useCard: false,
        widgets: [
          {
            type: "srlWidget",
            queryId: "queryId3",
            resultsFormat: "format1",
            config: {}
          }
        ],
        title: "SRL Widget"
      }
    ],
    c1_p1_r2: []
  }
};

export function reducer(
  state = initialState,
  action: DashboardActionsUnion
): State {
  switch (action.type) {
    case DashboardActionTypes.DPLoad: {
      return {
        ...state,
        loading: true
      };
    }

    case DashboardActionTypes.DPLoadSuccess: {
      const toReturn = { ...state, loaded: true, loading: false };

      action.payload.pages.map(page => {
        state.pagesMap[action.payload.courseId] =
          state.pagesMap[action.payload.courseId] || {};

        state.pagesMap[action.payload.courseId][page.id] = page;
      });
      return { ...toReturn };
    }
    case DashboardActionTypes.DRLoadSuccess: {
      return {
        ...state,
        rows: { ...state.rows, [action.payload.pageId]: action.payload.rows }
      };
    }

    case DashboardActionTypes.DCLoadSuccess: {
      return {
        ...state,
        columns: {
          ...state.columns,
          [action.payload.rowId]: action.payload.columns
        }
      };
    }

    default: {
      return state;
    }
  }
}

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

// export const getPages = (state: State) => state.pages;
