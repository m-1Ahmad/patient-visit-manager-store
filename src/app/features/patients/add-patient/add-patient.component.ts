import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { LettersOnlyDirective } from '../../../shared/Directives/letteronly.directive';
import { Patient } from '../../../core/models/patient';
import { AddPatient } from '../../../core/store/patients/patients.actions';

@Component({
  selector: 'app-patient-add',
  standalone: true,
  imports: [ReactiveFormsModule, LettersOnlyDirective],
  templateUrl: './add-patient.component.html',
  styleUrl: './add-patient.component.scss'
})
export class PatientAddComponent {
  constructor(private store: Store, private router: Router) {}

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
        patientId: 0,
        patientFirstName: this.form.patientFirstName.value!,
        patientLastName: this.form.patientLastName.value!,
        patientEmail: this.form.patientEmail.value!,
        patientContactNumber: this.form.patientPhone.value!
      };

      this.store.dispatch(new AddPatient(newPatient)).subscribe({
        next: () => this.router.navigate(['/patients'])
      });
    }
  }

  backToList(): void {
    this.router.navigate(['/patients']);
  }
}
