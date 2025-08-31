import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Visit } from '../../core/models/visit';
import { Patient } from '../../core/models/patient';
import { Doctor } from '../../core/models/doctor';
import { VisitsState } from '../../core/store/visits/visits.state';
import { LoadVisits, DeleteVisit } from '../../core/store/visits/visits.actions';
import { LoadPatients } from '../../core/store/patients/patients.actions';
import { PatientsState } from '../../core/store/patients/patients.state';
import { DoctorsState } from '../../core/store/doctors/doctors.state';
import { LoadDoctors } from '../../core/store/doctors/doctors.actions';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-visits',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './visits.component.html',
  styleUrl: './visits.component.scss'
})
export class VisitsComponent {
  @Select(VisitsState.visits) visits$!: Observable<Visit[]>;
  @Select(PatientsState.patients) patients$!: Observable<Patient[]>;
  @Select(DoctorsState.doctors) doctors$!: Observable<Doctor[]>;

  visitTypes: Record<number, string> = {
    1: 'Consultation',
    2: 'Follow Up',
    3: 'Emergency'
  };

  patients: Patient[] = [];
  doctors: Doctor[] = [];

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(new LoadVisits());
    this.store.dispatch(new LoadPatients());
    this.store.dispatch(new LoadDoctors());
    this.patients$.subscribe(p => this.patients = p);
    this.doctors$.subscribe(d => this.doctors = d);
  }

  onDelete(id: number): void {
    if (confirm('Are you sure to delete this visit?')) {
      this.store.dispatch(new DeleteVisit(id));
    }
  }

  onUpdate(id: number): void {
    this.router.navigate(['/update/visit', id]);
  }

  navigateToAdd(): void {
    this.router.navigate(['/add/visit']);
  }

  getPatientName(id: number): string {
    const patient = this.patients.find(p => p.patientId === id);
    return patient ? `${patient.patientFirstName} ${patient.patientLastName}` : '';
  }

  getDoctorName(id: number): string {
    const doctor = this.doctors.find(d => d.doctorId === id);
    return doctor ? `${doctor.doctorFirstName} ${doctor.doctorLastName}` : '';
  }
}
