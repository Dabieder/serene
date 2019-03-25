import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserRoutingModule } from "./user-routing.module";
import { ConsentPageComponent } from "./pages/consent-page.component";
import { MaterialModule } from "../material.module";
import { ConsentService } from "./services/consent.service";
import { CoreModule } from "../core/core.module";
import { EventService } from "./services/event.service";
import { TimelinePageComponent } from "./pages/timeline-page.component";
import { TimelineItemComponent } from "./components/timeline-item.component";
import { ConsentItemComponent } from "./components/consent-item.component";
import { LoginSelectionPageComponent } from "./pages/login-selection-page.component";
import { SignupPageComponent } from "./pages/signup-page.component";
import { SignInPageComponent } from "./pages/signin-page.component";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { UserEffects } from "./store/user.effects";
import { reducer } from "./store/user.reducers";
import { ReactiveFormsModule } from "@angular/forms";
import { ToolbarProfileComponent } from "./components/toolbar-profile.component";
import { ContactFormComponent } from "./components/contact-form.component";
import { ConsentEffects } from "./store/consent.effects";
import { SrlWidgetModule } from "../viz/store/srl-widget/srl-widget.module";
import { AuthEffects } from "./store/auth.effects";

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    UserRoutingModule,
    MaterialModule,
    StoreModule.forFeature("user", reducer),
    EffectsModule.forFeature([UserEffects, ConsentEffects, AuthEffects]),
    ReactiveFormsModule,
    SrlWidgetModule
  ],
  declarations: [
    ConsentPageComponent,
    TimelinePageComponent,
    TimelineItemComponent,
    ConsentItemComponent,
    LoginSelectionPageComponent,
    SignupPageComponent,
    SignInPageComponent,
    ToolbarProfileComponent,
    ContactFormComponent
  ],
  exports: [ToolbarProfileComponent],
  providers: [ConsentService, EventService]
})
export class UserModule {}
