import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import * as fromCourses from "../../reducers";
import * as CourseActions from "../../actions/course.actions";
import { Observable } from "rxjs";
import { Course } from "../../models/course";
import * as RouterActions from "../../../core/actions/router.actions";

@Component({
  selector: "app-course-page",
  templateUrl: "./course-page.component.html",
  styleUrls: ["./course-page.component.css"]
})
export class CoursePageComponent implements OnInit {
  courses$: Observable<Course[]>;

  constructor(private store: Store<fromCourses.State>) {
    this.courses$ = store.pipe(select(fromCourses.selectCourses));
  }

  ngOnInit() {
    this.store.dispatch(new CourseActions.Load());
  }

  openCourse(id: string) {
    this.store.dispatch(new RouterActions.OpenCourse(id));
  }
}
