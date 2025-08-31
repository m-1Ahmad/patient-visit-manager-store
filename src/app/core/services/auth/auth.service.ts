import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { Logout } from '../../store/auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl = 'http://localhost:5127/auth';
  private logoutTimer: any;
  private store = inject(Store);

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<{ token: string; user: any }> {
    return this.http.post<{ token: string; user: any }>(`${this.baseUrl}/login`, credentials);
  }

  signup(data: any) {
    return this.http.post(`${this.baseUrl}/signup`, data);
  }

  logout(): void {
    this.store.dispatch(new Logout());
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
      this.logoutTimer = null;
    }
  }

  startLogoutCountdown() {
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
    }
    const thirtyMinutes = 30 * 60 * 1000;
    this.logoutTimer = setTimeout(() => {
      this.logout();
    }, thirtyMinutes);
  }
}
