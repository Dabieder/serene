import {
  Directive,
  OnInit,
  OnDestroy,
  TemplateRef,
  ViewContainerRef
} from "@angular/core";

import { Store, select } from "@ngrx/store";

import { AppState } from "../user/store/user.reducers";

import { Subscription } from "rxjs";
import { selectCurrentCourseId } from "../reducers";

@Directive({ selector: "[appShowIfCourseSelected]" })
export class ShowIfCourseSelectedDirective implements OnInit, OnDestroy {
  constructor(
    private templateRef: TemplateRef<any>,
    private store: Store<AppState>,
    private viewContainer: ViewContainerRef
  ) {}

  condition: boolean;
  subscription: Subscription;

  ngOnInit(): void {
    this.subscription = this.store
      .pipe(select(selectCurrentCourseId))
      .subscribe(courseId => this.renderElementOnAuthenticated(courseId));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  renderElementOnAuthenticated(courseId: any) {
    if ((courseId && this.condition) || (!courseId && !this.condition)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
