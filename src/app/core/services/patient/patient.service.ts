import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Patient } from '../../models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private readonly baseUrl = 'http://localhost:5127/patient';

  private patients$ = new BehaviorSubject<Patient[]>([]);

  constructor(private http: HttpClient) {
    this.loadPatients();
  }
  getPatients(): Observable<Patient[]> {
    return this.patients$.asObservable();
  }
  loadPatients(): void {
    this.http.get<Patient[]>(this.baseUrl).subscribe(data => {
      next: this.patients$.next(data);
    });
  }
  addPatient(patient: Patient): void {
    this.http.post(this.baseUrl, patient, { responseType: 'text' })
      .subscribe({
        next: () => this.loadPatients(),
        error: (err) => console.error('Add failed:', err)
      });
  }
  updatePatient(patient: Patient): void {
    this.http.put(`${this.baseUrl}/${patient.patientId}`, patient, { responseType: 'text' })
      .subscribe({
        next: () => this.loadPatients(),
        error: (err) => console.error('Update failed:', err)
      });
  }
  deletePatient(id: number): void {
    this.http.delete<void>(`${this.baseUrl}/${id}`).subscribe({
      next: () => {
        const current = this.patients$.value.filter(p => p.patientId !== id);
        this.patients$.next(current);
      },
      error: () => {
        alert('Cannot delete patient due to record exists');
      }
    });
  }
}
