import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TimelinePageComponent } from "./pages/timeline-page.component";
import { SignupPageComponent } from "./pages/signup-page.component";
import { SignInPageComponent } from "./pages/signin-page.component";
import { AuthenticationGuard } from "../core/services/authentication.guard";
const routes: Routes = [
  {
    path: "timeline",
    component: TimelinePageComponent,
    canActivate: [AuthenticationGuard]
  },
  { path: "signin", component: SignInPageComponent },
  { path: "signup", component: SignupPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
