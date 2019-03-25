import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "./api.service";

@Injectable()
export class QueryService {
  constructor(private apiService: ApiService) {}

  query(queryId: string): Observable<any> {
    const url = "/queries/" + queryId;
    return this.apiService.get(url);
  }
}
