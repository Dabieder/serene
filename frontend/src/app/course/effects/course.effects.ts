import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Observable } from "rxjs";
import { Action } from "@ngrx/store";
import * as CourseActions from "../actions/course.actions";
import { CourseService } from "../../core/services/course.service";
import { switchMap, map } from "rxjs/operators";

@Injectable()
export class CourseEffects {
  @Effect()
  init$: Observable<Action> = this.actions$.pipe(
    ofType(CourseActions.CourseActionTypes.Load),
    switchMap(() =>
      this.courses.list().pipe(
        map(res => {
          return new CourseActions.LoadSuccess(res);
        })
      )
    )
  );

  constructor(private actions$: Actions, private courses: CourseService) {}
}
