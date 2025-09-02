import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { LettersOnlyDirective } from '../../../shared/Directives/letteronly.directive';
import { Doctor } from '../../../core/models/doctor';
import { AddDoctor } from '../../../core/store/doctors/doctors.actions';

@Component({
  selector: 'app-doctor-add',
  standalone: true,
  imports: [ReactiveFormsModule, LettersOnlyDirective],
  templateUrl: './add-doctor.component.html',
  styleUrl: './add-doctor.component.scss'
})
export class DoctorAddComponent {
  constructor(private store: Store, private router: Router) {}

  doctorForm = new FormGroup({
    doctorFirstName: new FormControl('', Validators.required),
    doctorLastName: new FormControl('', Validators.required),
    doctorEmail: new FormControl('', [Validators.required, Validators.email]),
    doctorPhone: new FormControl('', [Validators.required, 
      Validators.minLength(11), 
      Validators.maxLength(11), 
      Validators.pattern(/^\d+$/)])
  });

  get form() {
    return this.doctorForm.controls;
  }

  onSubmit(): void {
    if (this.doctorForm.valid) {
      const newDoctor: Doctor = {
        doctorId: 0,
        doctorFirstName: this.form.doctorFirstName.value!,
        doctorLastName: this.form.doctorLastName.value!,
        doctorEmail: this.form.doctorEmail.value!,
        doctorContactNumber: this.form.doctorPhone.value!
      };

      this.store.dispatch(new AddDoctor(newDoctor)).subscribe({
        next: () => this.router.navigate(['/doctors'])
      });
    }
  }

  backToList(): void {
    this.router.navigate(['/doctors']);
  }
}
