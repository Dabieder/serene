import { map, distinct, mergeMap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Observable } from "rxjs";
import { Action } from "@ngrx/store";
import * as QueryActions from "../actions/query.actions";
import { QueryService } from "../../core/services/query.service";

@Injectable()
export class QueryEffects {
  @Effect()
  init$: Observable<Action> = this.actions$.pipe(
    ofType(QueryActions.QueryActionTypes.Query),
    distinct((QueryAction: QueryActions.Query) => QueryAction.payload.queryId),

    mergeMap((QueryAction: QueryActions.Query) =>
      this.query.query(QueryAction.payload.queryId).pipe(
        map(res => {
          return new QueryActions.QuerySuccess({
            queryId: QueryAction.payload.queryId,
            data: res
          });
        })
      )
    )
  );

  constructor(private actions$: Actions, private query: QueryService) {}
}
