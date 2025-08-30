import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl = 'http://localhost:5127/auth';
  private logoutTimer: any;
  constructor(private http: HttpClient) { }

  login(credentials: {email: string, password: string}): Observable<{token: string, user: any}>{
    return this.http.post<{token: string, user: any}>(`${this.baseUrl}/login`, credentials);
  }

  logout(): void{
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
      this.logoutTimer = null;
    }
  }

  signup(data: any){
    return this.http.post(`${this.baseUrl}/signup`, data);
  }

  isLoggedIn(): boolean{
    if(localStorage.getItem('token')){
      return true;
    }
    return false;
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  getToken(): string | null{
    return localStorage.getItem('token');
  }

  startLogoutCountdown() {
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
    }
    // 30 minutes in milliseconds
    const thirtyMinutes = 30 * 60 * 1000;
    this.logoutTimer = setTimeout(() => {
      this.logout();
    }, thirtyMinutes);
  }
}
