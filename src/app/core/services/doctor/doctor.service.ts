import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../../models/doctor';
import { environment } from '../../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class DoctorService {
  private readonly baseUrl = `${environment.url}doctor`;

  constructor(private http: HttpClient) {}

  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.baseUrl);
  }

  addDoctor(doctor: Doctor): Observable<any> {
    return this.http.post(this.baseUrl, doctor, { responseType: 'text' });
  }

  updateDoctor(doctor: Doctor): Observable<any> {
    return this.http.put(`${this.baseUrl}/${doctor.doctorId}`, doctor, { responseType: 'text' });
  }

  deleteDoctor(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}
