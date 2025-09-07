import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, tap } from "rxjs";
import { SwalService } from "../utils/swal.service";
import { environment } from "../../../environments/environment.develop";
import { HttpRestfulService } from "../httprestfull.service";
import { LoadingService } from "../../../shared/header/utils/loading";

@Injectable({
  providedIn: 'root',
})
export class LeadsService extends HttpRestfulService {
    override apiUrl = environment.apiBaseUrl;

  constructor(
    protected override http: HttpClient,
    protected override loadingService: LoadingService,
    private swalService: SwalService
  ) {
    super('leads', http, loadingService)
  }
      public override forceDelete(id: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}/leads/forceDelete/${id}`);
}

  getLeadsCount(): Observable<{ total: number }> {
  return this.http.get<{ total: number }>(
    `${this.apiUrl}/leads/count?ts=${Date.now()}`
  );
}
}
