import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingService } from '../../shared/header/utils/loading';
import { environment } from '../../environments/environment.develop';
import { objectToFormData } from '../../shared/header/utils/functions';

@Injectable({
  providedIn: 'root'
})
export abstract class HttpRestfulService {

  protected endpoint: string;
  apiUrl = environment.apiBaseUrl;

  protected constructor(
    @Inject('endpoint') endpoint: string,
    protected http: HttpClient,
    protected loadingService: LoadingService
  ) {
    this.endpoint = endpoint;
  }

  create(data: any, headers?: HttpHeaders): Observable<any> {
    const formData = objectToFormData(data);
    return this.loadingService.observe(
      this.http.post(`${this.apiUrl}/${this.endpoint}/create`, formData, { headers })
    );
  }

  update(id: number, data: any, headers?: HttpHeaders): Observable<any> {
    console.log(data)
    return this.loadingService.observe(
        this.http.put(`${this.apiUrl}/${this.endpoint}/update/${id}`, data, { headers })
    );
  }

  delete(id: number, headers?: HttpHeaders): Observable<any> {
    return this.loadingService.observe(
      this.http.delete<any>(`${this.apiUrl}/${this.endpoint}/delete/${id}`, { headers })
    );
  }

  reactivate(id: number, headers?: HttpHeaders): Observable<any> {
    return this.loadingService.observe(
      this.http.put(`${this.apiUrl}/${this.endpoint}/restore/${id}`, {}, { headers })
    );
  }

  findAll(headers?: HttpHeaders): Observable<any> {
    return this.loadingService.observe(
      this.http.get(`${this.apiUrl}/${this.endpoint}/all`, { headers })
    );
  }

  findOne(id: number, headers?: HttpHeaders): Observable<any> {
    return this.loadingService.observe(
      this.http.get(`${this.apiUrl}/${this.endpoint}/${id}`, { headers })
    );
  }

  forceDelete(id: number, headers?: HttpHeaders): Observable<any> {
    return this.loadingService.observe(
      this.http.delete<any>(`${this.apiUrl}/${this.endpoint}/forceDelete/${id}`, { headers })
    );
  }
}
