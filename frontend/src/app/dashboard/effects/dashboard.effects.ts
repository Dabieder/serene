import {
  distinct,
  switchMap,
  mergeMap,
  mergeAll,
  map,
  catchError
} from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Observable, from, of } from "rxjs";
import { Action } from "@ngrx/store";
import * as DashboardActions from "../actions/dashboard.actions";
import { DashboardService } from "../../core/services/dashboard.service";
import { DashboardPageRow } from "../models/dashboard";

@Injectable()
export class DashboardEffects {
  @Effect()
  init$: Observable<Action> = this.actions$.pipe(
    ofType(DashboardActions.DashboardActionTypes.DPLoad),
    switchMap((payload: DashboardActions.DPLoad) =>
      this.dashboard.listPages(payload.payload.courseId).pipe(
        map(res => {
          return new DashboardActions.DPLoadSuccess({
            courseId: payload.payload.courseId,
            pages: res
          });
        }),
        catchError(err => {
          return of(
            new DashboardActions.DLoadError({
              error: "Error retrieving dashboard pages"
            })
          );
        })
      )
    )
  );

  @Effect()
  initRows$: Observable<Action> = this.actions$.pipe(
    ofType(DashboardActions.DashboardActionTypes.DRLoad),
    distinct((drload: DashboardActions.DRLoad) => drload.payload.pageId),
    switchMap((drload: DashboardActions.DRLoad) =>
      this.dashboard
        .listRows(drload.payload.courseId, drload.payload.pageId)
        .pipe(
          map(res => {
            return new DashboardActions.DRLoadSuccess({
              pageId: drload.payload.pageId,
              rows: res,
              courseId: drload.payload.courseId
            });
          }),
          catchError(err => {
            return of(
              new DashboardActions.DLoadError({
                error: "Error retrieving dashboard rows"
              })
            );
          })
        )
    )
  );

  @Effect({ dispatch: false })
  loadError$ = this.actions$.pipe(
    ofType(DashboardActions.DashboardActionTypes.DLoadError),
    map(err => {
      console.log("Error retrieving data for dashboard");
    })
  );

  @Effect()
  initColumns$: Observable<Action> = this.actions$
    .pipe(
      ofType(DashboardActions.DashboardActionTypes.DRLoadSuccess),
      distinct(
        (drloadsuccess: DashboardActions.DRLoadSuccess) =>
          drloadsuccess.payload.rows
      ),

      map((drloadsuccess: DashboardActions.DRLoadSuccess) =>
        from(drloadsuccess.payload.rows)
          .pipe(map((row: DashboardPageRow) => row.id))
          .pipe(
            mergeMap(rowId =>
              this.dashboard
                .listColumns(
                  drloadsuccess.payload.courseId,
                  drloadsuccess.payload.pageId,
                  rowId
                )
                .pipe(
                  map(res => {
                    const drls = new DashboardActions.DCLoadSuccess({
                      pageId: drloadsuccess.payload.pageId,
                      rowId: rowId,
                      columns: res
                    });
                    return drls;
                  })
                )
            )
          )
      )
    )
    .pipe(mergeAll());

  constructor(private actions$: Actions, private dashboard: DashboardService) {}
}
