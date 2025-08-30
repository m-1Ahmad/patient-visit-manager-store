import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { DoctorService } from '../../../core/services/doctor/doctor.service';
import { Doctor } from '../../../core/models/doctor';
import { Router } from '@angular/router';
import { LettersOnlyDirective } from '../../../shared/Directives/letteronly.directive';

@Component({
  selector: 'app-doctor-add',
  standalone: true,
  imports: [ReactiveFormsModule, LettersOnlyDirective],
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.scss']
})
export class DoctorAddComponent {
  constructor(private doctorService: DoctorService, private router: Router) {}

  doctorForm = new FormGroup({
    doctorFirstName: new FormControl('', Validators.required),
    doctorLastName: new FormControl('', Validators.required),
    doctorEmail: new FormControl('', [Validators.required, Validators.email]),
    doctorPhone: new FormControl('', Validators.required)
  });

  get form() {
    return this.doctorForm.controls;
  }

  onSubmit(): void {
    if (this.doctorForm.valid) {
      const newDoctor: Doctor = {
        doctorId: 12,
        doctorFirstName: this.form.doctorFirstName.value,
        doctorLastName: this.form.doctorLastName.value,
        doctorEmail: this.form.doctorEmail.value,
        doctorContactNumber: this.form.doctorPhone.value
      };
      this.doctorService.addDoctor(newDoctor);
      this.router.navigate(['/doctors']);
    }
  }
  backToList(): void{
    this.router.navigate(['/doctors']);
  }
}
