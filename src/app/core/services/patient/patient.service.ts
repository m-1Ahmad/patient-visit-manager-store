import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../../models/patient';

@Injectable({ providedIn: 'root' })
export class PatientService {
  private readonly baseUrl = 'http://localhost:5127/patient';

  constructor(private http: HttpClient) {}

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.baseUrl);
  }

  addPatient(patient: Patient): Observable<any> {
    return this.http.post(this.baseUrl, patient, { responseType: 'text' });
  }

  updatePatient(patient: Patient): Observable<any> {
    return this.http.put(`${this.baseUrl}/${patient.patientId}`, patient, { responseType: 'text' });
  }

  deletePatient(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}
