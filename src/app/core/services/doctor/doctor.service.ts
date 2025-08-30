import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Doctor } from '../../models/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private readonly baseUrl = 'http://localhost:5127/doctor';

  private doctors$ = new BehaviorSubject<Doctor[]>([]);

  constructor(private http: HttpClient) {
    this.loadDoctors();
  }

  getDoctors(): Observable<Doctor[]> {
    return this.doctors$.asObservable();
  }

  loadDoctors(): void {
    this.http.get<Doctor[]>(this.baseUrl).subscribe(data => {
      this.doctors$.next(data);
    });
  }

  addDoctor(doctor: Doctor): void {
    this.http.post<Doctor>(this.baseUrl, doctor).subscribe({
      next: (newDoctor) => {
        const current = [...this.doctors$.value, newDoctor];
        this.doctors$.next(current);
      },
      error: (err) => console.error('Add doctor failed:', err)
    });
  }

  updateDoctor(doctor: Doctor): void {
    this.http.put<Doctor>(`${this.baseUrl}/${doctor.doctorId}`, doctor).subscribe({
      next: (updatedDoctor) => {
        const current = this.doctors$.value.map(d =>
          d.doctorId === updatedDoctor.doctorId ? updatedDoctor : d
        );
        this.doctors$.next(current);
      },
      error: (err) => console.error('Update doctor failed:', err)
    });
  }
  deleteDoctor(id: number): void {
    this.http.delete<void>(`${this.baseUrl}/${id}`).subscribe({
      next: () => {
        const current = this.doctors$.value.filter(d => d.doctorId !== id);
        this.doctors$.next(current);
      },
      error: () => {
        alert('Cannot delete Doctor, It has already record');
      }
    });
  }
}
