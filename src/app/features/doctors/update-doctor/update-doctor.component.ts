import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from '../../../core/services/doctor/doctor.service';
import { Doctor } from '../../../core/models/doctor';
import { LettersOnlyDirective } from '../../../shared/Directives/letteronly.directive';

@Component({
  selector: 'app-doctor-update',
  standalone: true,
  imports: [ReactiveFormsModule, LettersOnlyDirective],
  templateUrl: './update-doctor.component.html',
  styleUrls: ['./update-doctor.component.scss']
})
export class DoctorUpdateComponent {
  doctorForm: FormGroup;
  doctorId: number | null = null;

  constructor(private doctorService: DoctorService,private router: Router,private route: ActivatedRoute) {
    this.doctorForm = new FormGroup({
      doctorFirstName: new FormControl('', Validators.required),
      doctorLastName: new FormControl('', Validators.required),
      doctorEmail: new FormControl('', [Validators.required, Validators.email]),
      doctorContactNumber: new FormControl('', Validators.required)
    });
  }

  get form() {
    return this.doctorForm.controls;
  }

  ngOnInit(): void {
    this.doctorId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.doctorId) {
      this.doctorService.getDoctors().subscribe(doctors => {
        const doctor = doctors.find(d => d.doctorId === this.doctorId);
        if (doctor) {
          this.doctorForm.patchValue({
            doctorFirstName: doctor.doctorFirstName,
            doctorLastName: doctor.doctorLastName,
            doctorEmail: doctor.doctorEmail,
            doctorContactNumber: doctor.doctorContactNumber
          });
        }
      });
    }
  }

  onSubmit(): void {
    if (this.doctorForm.valid && this.doctorId) {
      const updatedDoctor: Doctor = {
        doctorId: this.doctorId!,
        doctorFirstName: this.form['doctorFirstName'].value,
        doctorLastName: this.form['doctorLastName'].value,
        doctorEmail: this.form['doctorEmail'].value,
        doctorContactNumber: this.form['doctorContactNumber'].value
      };

      this.doctorService.updateDoctor(updatedDoctor);
      this.router.navigate(['/doctors']);
    }
  }
  backToList(): void{
    this.router.navigate(['/doctors']);
  }
}
