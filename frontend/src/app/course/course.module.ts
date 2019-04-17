import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CourseRoutingModule } from "./course-routing.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    CourseRoutingModule,
    // EffectsModule.forRoot([]),
    SharedModule
  ],
  declarations: []
})
export class CourseModule {}
