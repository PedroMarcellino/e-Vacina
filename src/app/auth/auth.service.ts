import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { isPlatformBrowser } from "@angular/common";
import { Observable, tap } from "rxjs";
import { SwalService } from "../services/utils/swal.service";



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'token';
  private userKey = 'user';

  private apiUrl = 'http://localhost:8000/api';

  constructor(
    private http: HttpClient,
    private router: Router,
    private swalService: SwalService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}



  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data).pipe(
      tap(() => {
        this.router.navigate(['/login']);
      })
    );
  }

  login(email: string, password: string): Observable<any> {
    return new Observable(observer => {
      this.http.post(`${this.apiUrl}/login`, { email, password }).subscribe({
        next: (res: any) => {
          if (res.token) {
            localStorage.setItem('token', res.token);
          }
          observer.next(res);
          observer.complete();
        },
        error: (err) => {
          observer.error(err);
        }
      });
    });
  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
   
    getUser() {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem(this.userKey);
      return user ? JSON.parse(user) : null;
    }
    return null;
  }
}
