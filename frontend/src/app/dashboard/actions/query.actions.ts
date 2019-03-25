import { Action } from "@ngrx/store";

export enum QueryActionTypes {
  Query = "[Query] Send Query To Server",
  QuerySuccess = "[Query] Query Result"
}

export class Query implements Action {
  readonly type = QueryActionTypes.Query;
  constructor(public payload: { queryId: string }) {}
}

export class QuerySuccess implements Action {
  readonly type = QueryActionTypes.QuerySuccess;
  constructor(public payload: { queryId: string; data: any }) {}
}

export type QueryActionsUnion = Query | QuerySuccess;
