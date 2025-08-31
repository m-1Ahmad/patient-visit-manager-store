import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Patient } from '../../../core/models/patient';
import { Doctor } from '../../../core/models/doctor';
import { AddVisit } from '../../../core/store/visits/visits.actions';
import { PatientsState } from '../../../core/store/patients/patients.state';
import { LoadPatients } from '../../../core/store/patients/patients.actions';
import { DoctorsState } from '../../../core/store/doctors/doctors.state';
import { LoadDoctors } from '../../../core/store/doctors/doctors.actions';

@Component({
  selector: 'app-visit-add',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-visit.component.html',
  styleUrl: './add-visit.component.scss'
})
export class VisitAddComponent {
  @Select(PatientsState.patients) patients$!: Observable<Patient[]>;
  @Select(DoctorsState.doctors) doctors$!: Observable<Doctor[]>;
  patients: Patient[] = [];
  doctors: Doctor[] = [];

  visitForm = new FormGroup({
    patientId: new FormControl('', Validators.required),
    doctorId: new FormControl('', Validators.required),
    visitDate: new FormControl('', Validators.required),
    visitDescription: new FormControl('', Validators.required),
    visitTypeId: new FormControl('', Validators.required),
    duration: new FormControl(30, Validators.required)
  });

  visitTypes = [
    { id: 1, name: 'Consultation' },
    { id: 2, name: 'Follow Up' },
    { id: 3, name: 'Emergency' }
  ];

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(new LoadPatients());
    this.store.dispatch(new LoadDoctors());
    this.patients$.subscribe(p => this.patients = p);
    this.doctors$.subscribe(d => this.doctors = d);
  }

  get form() { return this.visitForm.controls; }

  onSubmit(): void {
    if (this.visitForm.valid) {
      const newVisit: any = {
        visitId: 0,
        patientId: Number(this.form.patientId.value),
        doctorId: Number(this.form.doctorId.value),
        visitDate: this.form.visitDate.value,
        visitDescription: this.form.visitDescription.value,
        visitTypeId: Number(this.form.visitTypeId.value),
        duration: Number(this.form.duration.value),
        feesId: Number(this.form.visitTypeId.value)
      };

      this.store.dispatch(new AddVisit(newVisit)).subscribe({
        next: () => {
          alert('Visit Added Successfully');
          this.router.navigate(['/visits']);
        }
      });
    }
  }

  backToList(): void {
    this.router.navigate(['/visits']);
  }
}
