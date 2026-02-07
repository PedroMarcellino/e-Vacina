import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, tap } from "rxjs";
import { SwalService } from "../utils/swal.service";
import { environment } from "../../../environments/environment.develop";
import { HttpRestfulService } from "../httprestfull.service";
import { LoadingService } from '../../../shared/utils/loading';

@Injectable({
  providedIn: 'root'
})
export class EquipamentsService extends HttpRestfulService {
  override apiUrl = environment.apiBaseUrl;

  constructor(
    protected override http: HttpClient,
    protected override loadingService: LoadingService,
    private swalService: SwalService
  ) {
    super('equipaments', http, loadingService)
  }
  public override forceDelete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/equipaments/forceDelete/${id}`);
  }

  getEquipamentsCount(): Observable<{ total: number }> {
    return this.http.get<{ total: number }>(
      `${this.apiUrl}/equipaments/count?ts=${Date.now()}`
    );
  }

}
