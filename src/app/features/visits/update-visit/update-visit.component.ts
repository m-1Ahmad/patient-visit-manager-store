import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { VisitService } from '../../../core/services/visit/visit.service';
import { PatientService } from '../../../core/services/patient/patient.service';
import { DoctorService } from '../../../core/services/doctor/doctor.service';
import { Patient } from '../../../core/models/patient';
import { Doctor } from '../../../core/models/doctor';
import { Visit } from '../../../core/models/visit';

@Component({
  selector: 'app-visit-update',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-visit.component.html',
  styleUrl: './update-visit.component.scss'
})
export class VisitUpdateComponent implements OnInit {
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

  constructor(
    private visitService: VisitService,
    private patientService: PatientService,
    private doctorService: DoctorService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.patientService.getPatients().subscribe(data => (this.patients = data));
    this.doctorService.getDoctors().subscribe(data => (this.doctors = data));

    this.visitId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.visitId) {
      this.visitService.getVisits().subscribe((visits: Visit[]) => {
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
    if (this.visitForm.valid) {
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

      this.visitService.updateVisit(updatedVisit);
      this.router.navigate(['/visits']);
    }
  }

  backToList(): void {
    this.router.navigate(['/visits']);
  }
}
