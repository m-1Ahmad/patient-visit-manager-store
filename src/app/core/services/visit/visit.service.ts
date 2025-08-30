import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Visit } from '../../models/visit';
import { Patient } from '../../models/patient';
import { Doctor } from '../../models/doctor';

@Injectable({
  providedIn: 'root'
})
export class VisitService {
  private readonly baseUrl = 'http://localhost:5127/visit';
  private visits$ = new BehaviorSubject<Visit[]>([]);

  constructor(private http: HttpClient) {
    this.loadVisits();
  }

  getVisits(): Observable<Visit[]> {
    return this.visits$.asObservable();
  }

  loadVisits(): void {
    this.http.get<Visit[]>(this.baseUrl).subscribe(data => {
      this.visits$.next(data);
    });
  }

  addVisit(visit: Visit): void {
    this.http.post(`${this.baseUrl}`, visit, { responseType: 'text' }).subscribe(() => {
      this.loadVisits();
    });
  }

  updateVisit(visit: Visit): void {
    this.http.put(`${this.baseUrl}/update/${visit.visitId}`, visit, { responseType: 'text' }).subscribe(() => {
      this.loadVisits();
    });
  }

  deleteVisit(id: number): void {
    this.http.delete(`${this.baseUrl}/delete/${id}`, { responseType: 'text' }).subscribe(() => {
      const current = this.visits$.value.filter(v => v.visitId !== id);
      this.visits$.next(current);
    });
  }
}
