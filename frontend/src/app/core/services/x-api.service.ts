import { Injectable } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root"
})
export class XApiService {
  headers: HttpHeaders;

  constructor(private apiService: ApiService) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set(
      "Content-Type",
      "application/json; charset=utf-8"
    );
  }

  submitStatement(statement: any): Observable<any> {
    return this.apiService.post("/statements", statement);
    // return this.http.post(
    //   environment.xapi_backend_url,
    //   statement, {headers: this.headers}
    // );
  }
}
