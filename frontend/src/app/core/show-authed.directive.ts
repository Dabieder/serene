import {
  Directive,
  Input,
  OnInit,
  OnDestroy,
  TemplateRef,
  ViewContainerRef
} from "@angular/core";
import { AppState } from "../reducers";
import { Store, select } from "@ngrx/store";
import { Subscription } from "rxjs";

// Inspired by: https://g00glen00b.be/authentication-angular/
@Directive({ selector: "[appShowAuthed]" })
export class ShowAuthedDirective implements OnInit, OnDestroy {
  constructor(
    private templateRef: TemplateRef<any>,
    private store: Store<AppState>,
    private viewContainer: ViewContainerRef
  ) {}

  condition: boolean;
  subscription: Subscription;

  @Input()
  set appShowAuthed(condition: boolean) {
    this.condition = condition;
  }

  ngOnInit(): void {
    this.subscription = this.store
      .pipe(
        select(function(state) {
          return state.user.authenticated;
        })
      )
      .subscribe(auth => this.renderElementOnAuthenticated(auth));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  renderElementOnAuthenticated(auth: boolean) {
    if ((auth && this.condition) || (!auth && !this.condition)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
