import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { VisitService } from '../../../core/services/visit/visit.service';
import { PatientService } from '../../../core/services/patient/patient.service';
import { DoctorService } from '../../../core/services/doctor/doctor.service';
import { Patient } from '../../../core/models/patient';
import { Doctor } from '../../../core/models/doctor';

@Component({
  selector: 'app-visit-add',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-visit.component.html',
  styleUrl: './add-visit.component.scss'
})
export class VisitAddComponent {
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

  constructor(
    private visitService: VisitService,
    private patientService: PatientService,
    private doctorService: DoctorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.patientService.getPatients().subscribe(data => this.patients = data);
    this.doctorService.getDoctors().subscribe(data => this.doctors = data);
  }

  get form() { return this.visitForm.controls; }

  onSubmit(): void {
    if(this.visitForm.valid) {
      const newVisit: any = {
      visitId: 12,
      patientId: Number(this.visitForm.controls['patientId'].value),
      doctorId: Number(this.visitForm.controls['doctorId'].value),
      visitDate: this.visitForm.controls['visitDate'].value,
      visitDescription: this.visitForm.controls['visitDescription'].value,
      visitTypeId: Number(this.visitForm.controls['visitTypeId'].value),
      duration: this.visitForm.controls['duration'].value,
      feesId: Number(this.visitForm.controls['visitTypeId'].value)
    };
      this.visitService.addVisit(newVisit);
      alert('Visit Added Successfully');
      this.router.navigate(['/visits']);
    }
  }
  backToList(): void{
    this.router.navigate(['/visits']);
  }
}
