import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Visit } from '../../models/visit';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class VisitService {
  private readonly baseUrl = `${environment.url}visit`;

  constructor(private http: HttpClient) {}

  getVisits(): Observable<Visit[]> {
    return this.http.get<Visit[]>(this.baseUrl);
  }

  addVisit(visit: Visit): Observable<any> {
    return this.http.post(`${this.baseUrl}`, visit, { responseType: 'text' });
  }

  updateVisit(visit: Visit): Observable<any> {
    return this.http.put(`${this.baseUrl}/${visit.visitId}`, visit, { responseType: 'text' });
  }

  deleteVisit(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}
