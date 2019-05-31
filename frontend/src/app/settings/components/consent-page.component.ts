import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Consent } from "../models/consent";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Store, select } from "@ngrx/store";
import { takeUntil } from "rxjs/operators";
import { getConsent, AppState, isLoading } from "../../reducers";
import { User } from "../../user/models/user";
import {
  ConsentSubmitAction,
  ConsentRetrieveAction
} from "../../user/store/user.actions";
import { BaseComponent } from "../../core/base-component";
import { Observable } from "rxjs";
import { LoggingService } from "src/app/core/services/logging.service";
import { ConsentItem } from "../models/consent-item";
import { ShowToolbarAction } from "src/app/core/actions/layout.actions";
@Component({
  selector: "app-consent-page",
  templateUrl: "./consent-page.component.html",
  styleUrls: ["./consent-page.component.scss"]
})
export class ConsentPageComponent extends BaseComponent implements OnInit {
  loading$: Observable<boolean>;
  consentForm: FormGroup;
  consentData: any;
  courseId: string;
  consent: Consent;
  user: User;
  @ViewChild("consentFormWrapper", { static: true })
  consentFormWrapper: ElementRef;
  @ViewChild("termsAndConditions", { static: false })
  termsAndConditions: ElementRef;

  consentItemSerene: ConsentItem;
  ngOnInit() {
    this.consentForm = new FormGroup({
      hasReadIntroduction: new FormControl(false, Validators.requiredTrue),
      hasReadTermsAndConditions: new FormControl(
        false,
        Validators.requiredTrue
      ),
      consentSerene: new FormControl(false)
    });

    // this.store$.dispatch(new ConsentRetrieveAction());

    // this.store$
    //   .pipe(
    //     select(getConsent),
    //     takeUntil(this.unsubscribe$)
    //   )
    //   .subscribe(consent => {
    //     this.consent = consent;
    //   });

    this.consentItemSerene = new ConsentItem(
      "abc",
      "Serene",
      "Serene is an application where you can plan, monitor and reflect on your learning goals",
      false,
      "assessment",
      [
        "Learning goals",
        "Time planning to reach the learning goals",
        "Reflections on the accomplishment of the learning goals",
        "Navigation data"
      ]
    );
    this.loggingService.logEvent("[Consent Form] Opened Consent Form");
    // this.loading$ = this.store.pipe(select(isLoading));
  }

  consentToAll() {
    for (let i = 0; i < this.consent.consentItems.length; i++) {
      const ci = this.consent.consentItems[i];
      ci.consented = true;
    }

    this.loggingService.logEvent("[Consent Form] Consent To All");
  }

  constructor(
    private store$: Store<AppState>,
    private loggingService: LoggingService
  ) {
    super();
  }

  onPanelExpandedChange(panelName: string) {
    this.loggingService.logEvent(`[Consent Form] Expanded Panel: ${panelName}`);
  }

  consentItemChange(consentItem: ConsentItem) {
    this.loggingService.logEvent(
      `[Consent Form] Consent Change: ${consentItem.name} - ${
        consentItem.consented
      }`
    );
  }

  consentItemExpanded(event: any, itemName: string) {
    this.onPanelExpandedChange(itemName);
  }

  onSubmit() {
    this.store$.dispatch(
      new ConsentSubmitAction({ consent: { ...this.consent } })
    );
    this.store$.dispatch(new ShowToolbarAction());
    this.loggingService.logEvent("[Consent Form] Submit Consent Form");
  }
}
