
import {map} from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Course } from "../../course/models/course";
import { ApiService } from "./api.service";

@Injectable()
export class CourseService {
  constructor(private apiService: ApiService) {}

  list(): Observable<Course[]> {
    return this.apiService.get("/courses").pipe(map(response => response.courses));
  }
}
