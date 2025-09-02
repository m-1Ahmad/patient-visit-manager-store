import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LettersOnlyDirective } from '../../../shared/Directives/letteronly.directive';
import { Doctor } from '../../../core/models/doctor';
import { UpdateDoctor } from '../../../core/store/doctors/doctors.actions';
import { DoctorsState } from '../../../core/store/doctors/doctors.state';

@Component({
  selector: 'app-doctor-update',
  standalone: true,
  imports: [ReactiveFormsModule, LettersOnlyDirective],
  templateUrl: './update-doctor.component.html',
  styleUrl: './update-doctor.component.scss'
})
export class DoctorUpdateComponent implements OnInit {
  doctorForm: FormGroup;
  doctorId: number | null = null;

  @Select(DoctorsState.doctors) doctors$!: Observable<Doctor[]>;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.doctorForm = new FormGroup({
      doctorFirstName: new FormControl('', Validators.required),
      doctorLastName: new FormControl('', Validators.required),
      doctorEmail: new FormControl('', [Validators.required, Validators.email]),
      doctorContactNumber: new FormControl('', [Validators.required, 
        Validators.minLength(11), 
        Validators.maxLength(11), 
        Validators.pattern(/^\d+$/)])
    });
  }

  get form() {
    return this.doctorForm.controls;
  }

  ngOnInit(): void {
    this.doctorId = Number(this.route.snapshot.paramMap.get('id'));
    this.doctors$.subscribe(doctors => {
      if (this.doctorId) {
        const doctor = doctors.find(d => d.doctorId === this.doctorId);
        if (doctor) {
          this.doctorForm.patchValue({
            doctorFirstName: (doctor as any).doctorFirstName ?? '',
            doctorLastName: (doctor as any).doctorLastName ?? '',
            doctorEmail: (doctor as any).doctorEmail ?? '',
            doctorContactNumber: (doctor as any).doctorContactNumber ?? ''
          });
        }
      }
    });
  }

  onSubmit(): void {
    if (this.doctorForm.valid && this.doctorId) {
      const updatedDoctor: Doctor = {
        doctorId: this.doctorId,
        doctorFirstName: this.form['doctorFirstName'].value!,
        doctorLastName: this.form['doctorLastName'].value!,
        doctorEmail: this.form['doctorEmail'].value!,
        doctorContactNumber: this.form['doctorContactNumber'].value!
      } as Doctor;

      this.store.dispatch(new UpdateDoctor(updatedDoctor)).subscribe({
        next: () => this.router.navigate(['/doctors'])
      });
    }
  }

  backToList(): void {
    this.router.navigate(['/doctors']);
  }
}
