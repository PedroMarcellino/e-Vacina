import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, tap } from "rxjs";
import { SwalService } from "../utils/swal.service";
import { environment } from "../../../environments/environment.develop";
import { HttpRestfulService } from "../httprestfull.service";
import { LoadingService } from "../../../shared/header/utils/loading";
import { Users } from "../../../models/Users.model";

@Injectable({
  providedIn: 'root',
})
export class UsersService extends HttpRestfulService {
  override apiUrl = environment.apiBaseUrl;

  constructor(
    protected override http: HttpClient,
    protected override loadingService: LoadingService,
    private swalService: SwalService
  ) {
    super('users', http, loadingService)
  }

  getById(id: number): Observable<Users> {
     return this.http.get<Users>('http://localhost:8000/api/user');
  }

  updateUser(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }
}