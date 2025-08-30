import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from '../../core/models/patient';
import { PatientService } from '../../core/services/patient/patient.service';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.scss'
})
export class PatientsComponent {
  patients: Patient[] = [];

  constructor(private patientService: PatientService, private router: Router) {}

  ngOnInit(): void {
    this.patientService.getPatients().subscribe(data => {
      this.patients = data;
    });
  }

  onDelete(patientId: number): void {
    if(confirm("You Sure want to delete the data?")){
      this.patientService.deletePatient(patientId);
      this.router.navigate(['/patients']);
    }
  }

  navigateToAdd(): void {
    this.router.navigate(['/add/patient']);
  }

  onUpdate(patientId: number): void {
    this.router.navigate(['/update/patient',patientId]);
  }
}
