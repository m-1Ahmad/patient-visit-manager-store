import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl = 'http://localhost:5127/user';

  private users$ = new BehaviorSubject<User[]>([]);

  constructor(private http: HttpClient) {
    this.loadUsers();
  }

  getUsers(): Observable<User[]> {
    return this.users$.asObservable();
  }

  loadUsers(): void {
    this.http.get<User[]>(this.baseUrl).subscribe(data => {
      this.users$.next(data);
    });
  }

  deleteUser(id: number): void {
    this.http.delete<void>(`${this.baseUrl}/${id}`).subscribe(() => {
      const current = this.users$.value.filter(u => u.userId !== id);
      this.users$.next(current);
    });
  }
}
