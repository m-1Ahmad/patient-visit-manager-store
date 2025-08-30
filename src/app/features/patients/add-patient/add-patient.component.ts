import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { PatientService } from '../../../core/services/patient/patient.service';
import { Patient } from '../../../core/models/patient';
import { Router } from '@angular/router';
import { LettersOnlyDirective } from '../../../shared/Directives/letteronly.directive';

@Component({
  selector: 'app-patient-add',
  standalone: true,
  imports: [ReactiveFormsModule,LettersOnlyDirective],
  templateUrl:'./add-patient.component.html',
  styleUrl: './add-patient.component.scss'
})
export class PatientAddComponent {
  constructor(private patientService: PatientService, private router: Router) {}
  patientForm = new FormGroup({
      patientFirstName: new FormControl('', Validators.required),
      patientLastName: new FormControl('', Validators.required),
      patientEmail: new FormControl('', [Validators.required, Validators.email]),
      patientPhone: new FormControl('', Validators.required)
  });

  get form() {
    return this.patientForm.controls;
  }

  onSubmit(): void {
    if (this.patientForm.valid) {
      const newPatient: Patient = {
        patientId: 12,
        patientFirstName: this.form.patientFirstName.value,
        patientLastName: this.form.patientLastName.value,
        patientEmail: this.form.patientEmail.value,
        patientContactNumber: this.form.patientPhone.value
      };
      this.patientService.addPatient(newPatient);
      this.router.navigate(['/patients']);
    }
  }
  backToList(): void{
    this.router.navigate(['/patients']);
  }
}
