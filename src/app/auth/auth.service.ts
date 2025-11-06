import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { isPlatformBrowser } from "@angular/common";
import { Observable, tap } from "rxjs";
import { SwalService } from "../services/utils/swal.service";
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<any>(this.getStoredUser());
  user$ = this.userSubject.asObservable();
  private tokenKey = 'token';
  private userKey = 'user';

  private apiUrl = 'http://localhost:8000/api';

  private user: any = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private swalService: SwalService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }


  private getStoredUser() {
    return JSON.parse(localStorage.getItem('user') || 'null');
  }

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
          this.clearUser();
          localStorage.removeItem(this.tokenKey);

          if (res.token) {
            localStorage.setItem(this.tokenKey, res.token);
          }

          if (res.user) {
            this.setUser(res.user);
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

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

  resetPassword(data: { email: string; token: string; password: string; password_confirmation: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, data);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.user = null;
    this.router.navigate(['/login']);
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getUser() {
    if (isPlatformBrowser(this.platformId)) {
      const userString = localStorage.getItem(this.userKey);
      const user = userString ? JSON.parse(userString) : null;
      this.user = user;
      return user;
    }
    return null;
  }


  setUser(user: any) {
    this.user = user;
    localStorage.setItem(this.userKey, JSON.stringify(user));
    this.userSubject.next(user);
  }

  clearUser() {
    this.user = null;
    localStorage.removeItem(this.userKey);
  }
}
