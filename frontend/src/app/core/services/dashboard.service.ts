import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DashboardPage } from "../../dashboard/models/dashboard";
import { ApiService } from "./api.service";

@Injectable()
export class DashboardService {
  constructor(private apiService: ApiService) {}

  listPages(courseId: string): Observable<DashboardPage[]> {
    const url = `/courses/` + courseId + "/pages";
    return this.apiService.get(url);
  }

  listRows(courseId: string, pageId: string) {
    const url = `/courses/${courseId}/pages/${pageId}/rows`;
    return this.apiService.get(url);
  }

  listColumns(courseId: string, pageId: string, rowId: string) {
    const url = `/courses/${courseId}/pages/${pageId}/rows/${rowId}/columns`;
    return this.apiService.get(url);
  }

  getWidget(widgetId: string) {
    const url = `/dashboard/widgets/${widgetId}`;
    return this.apiService.get(url);
  }
}
