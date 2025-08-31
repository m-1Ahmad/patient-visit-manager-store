import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Visit } from '../../../core/models/visit';
import { Patient } from '../../../core/models/patient';
import { Doctor } from '../../../core/models/doctor';
import { VisitsState } from '../../../core/store/visits/visits.state';
import { PatientsState } from '../../../core/store/patients/patients.state';
import { DoctorsState } from '../../../core/store/doctors/doctors.state';
import { LoadVisits, UpdateVisit } from '../../../core/store/visits/visits.actions';
import { LoadPatients } from '../../../core/store/patients/patients.actions';
import { LoadDoctors } from '../../../core/store/doctors/doctors.actions';

@Component({
  selector: 'app-visit-update',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-visit.component.html',
  styleUrl: './update-visit.component.scss'
})
export class VisitUpdateComponent implements OnInit {
  @Select(VisitsState.visits) visits$!: Observable<Visit[]>;
  @Select(PatientsState.patients) patients$!: Observable<Patient[]>;
  @Select(DoctorsState.doctors) doctors$!: Observable<Doctor[]>;

  patients: Patient[] = [];
  doctors: Doctor[] = [];
  visitId!: number;

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

  constructor(private store: Store, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.store.dispatch(new LoadPatients());
    this.store.dispatch(new LoadDoctors());
    this.store.dispatch(new LoadVisits());
    this.patients$.subscribe(p => this.patients = p);
    this.doctors$.subscribe(d => this.doctors = d);
    this.visitId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.visitId) {
      this.visits$.subscribe(visits => {
        const visit = visits.find(v => v.visitId === this.visitId);
        if (visit) {
          this.visitForm.patchValue({
            patientId: String(visit.patientId),
            doctorId: String(visit.doctorId),
            visitDate: visit.visitDate,
            visitDescription: visit.visitDescription,
            visitTypeId: String(visit.visitTypeId),
            duration: visit.duration
          });
        }
      });
    }
  }

  get form() {
    return this.visitForm.controls;
  }

  onSubmit(): void {
    if (this.visitForm.valid && this.visitId) {
      const updatedVisit: any = {
        visitId: this.visitId,
        patientId: Number(this.form['patientId'].value),
        doctorId: Number(this.form['doctorId'].value),
        visitDate: this.form['visitDate'].value ?? '',
        visitDescription: this.form['visitDescription'].value ?? '',
        visitTypeId: Number(this.form['visitTypeId'].value),
        duration: Number(this.form['duration'].value),
        feesId: Number(this.form['visitTypeId'].value)
      };

      this.store.dispatch(new UpdateVisit(updatedVisit)).subscribe({
        next: () => this.router.navigate(['/visits'])
      });
    }
  }

  backToList(): void {
    this.router.navigate(['/visits']);
  }
}
