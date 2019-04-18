import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserRoutingModule } from "./user-routing.module";
import { MaterialModule } from "../material.module";
import { CoreModule } from "../core/core.module";
import { SignupPageComponent } from "./pages/signup-page.component";
import { SignInPageComponent } from "./pages/signin-page.component";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { UserEffects } from "./store/user.effects";
import { reducer } from "./store/user.reducers";
import { ReactiveFormsModule } from "@angular/forms";
import { ContactFormComponent } from "../settings/components/contact-form.component";
import { ConsentEffects } from "./store/consent.effects";
import { AuthEffects } from "./store/auth.effects";
import { SrlWidgetModule } from "../srl/srl-widget.module";

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
    SignupPageComponent,
    SignInPageComponent,
    ContactFormComponent
  ],
  exports: [SignInPageComponent],
  providers: []
})
export class UserModule {}
