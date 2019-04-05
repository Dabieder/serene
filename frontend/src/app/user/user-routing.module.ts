import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ConsentPageComponent } from "../settings/components/consent-page.component";
import { TimelinePageComponent } from "./pages/timeline-page.component";
import { SignupPageComponent } from "./pages/signup-page.component";
import { SignInPageComponent } from "./pages/signin-page.component";
import { AuthenticationGuard } from "../core/services/authentication.guard";
import { ContactFormComponent } from "./components/contact-form.component";

const routes: Routes = [
  {
    path: "consent/:courseId",
    component: ConsentPageComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: "timeline",
    component: TimelinePageComponent,
    canActivate: [AuthenticationGuard]
  },
  { path: "signin", component: SignInPageComponent },
  { path: "signup", component: SignupPageComponent },
  { path: "contact", component: ContactFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
