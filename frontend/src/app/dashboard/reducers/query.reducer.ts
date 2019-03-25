import { QueryActionTypes, QueryActionsUnion } from "../actions/query.actions";
import { ResultList } from "../models/query";
const queryInitialState = {
  queryId: null,
  queryId3: {
    metadata: {
      xAxis: "Country",
      yAxis: "Population"
    },
    data: [
      {
        name: "Germany",
        value: 52
      },
      {
        name: "France",
        value: 72
      }
    ]
  },
  queryId2: {
    metadata: {
      xAxis: "Country",
      yAxis: "Population"
    },
    data: [
      {
        name: "Belgium",
        value: 13
      },
      {
        name: "France",
        value: 72
      }
    ]
  }
};
export interface State {
  loaded: boolean;
  results: ResultList;
}

const initialState: State = {
  loaded: false,
  results: queryInitialState
};

export function reducer(
  state = initialState,
  action: QueryActionsUnion
): State {
  switch (action.type) {
    case QueryActionTypes.QuerySuccess: {
      const returnState = { ...state };
      returnState.results[action.payload.queryId] = action.payload.data;
      return returnState;
    }

    default: {
      return state;
    }
  }
}

export const getResults = (state: State) => state.results;
