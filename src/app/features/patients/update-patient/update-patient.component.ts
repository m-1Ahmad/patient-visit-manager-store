import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LettersOnlyDirective } from '../../../shared/Directives/letteronly.directive';
import { Patient } from '../../../core/models/patient';
import { UpdatePatient } from '../../../core/store/patients/patients.actions';
import { PatientsState } from '../../../core/store/patients/patients.state';

@Component({
  selector: 'app-patient-update',
  standalone: true,
  imports: [ReactiveFormsModule, LettersOnlyDirective],
  templateUrl: './update-patient.component.html',
  styleUrl: './update-patient.component.scss'
})
export class PatientUpdateComponent implements OnInit {
  patientForm: FormGroup;
  patientId: number | null = null;

  @Select(PatientsState.patients) patients$!: Observable<Patient[]>;

  constructor( private store: Store, private router: Router, private route: ActivatedRoute) {
    this.patientForm = new FormGroup({
      patientFirstName: new FormControl('', Validators.required),
      patientLastName: new FormControl('', Validators.required),
      patientEmail: new FormControl('', [Validators.required, Validators.email]),
      patientContactNumber: new FormControl('', [Validators.required, Validators.minLength(11), Validators.pattern(/^\d+$/)])
    });
  }

  get form() {
    return this.patientForm.controls;
  }

  ngOnInit(): void {
    this.patientId = Number(this.route.snapshot.paramMap.get('id'));
    this.patients$.subscribe(patients => {
      if (this.patientId) {
        const patient = patients.find(p => p.patientId === this.patientId);
        if (patient) {
          this.patientForm.patchValue({
            patientFirstName: patient.patientFirstName,
            patientLastName: patient.patientLastName,
            patientEmail: patient.patientEmail,
            patientContactNumber: patient.patientContactNumber
          });
        }
      }
    });
  }

  onSubmit(): void {
    if (this.patientForm.valid && this.patientId) {
      const updatedPatient: Patient = {
        patientId: this.patientId,
        patientFirstName: this.form['patientFirstName'].value!,
        patientLastName: this.form['patientLastName'].value!,
        patientEmail: this.form['patientEmail'].value!,
        patientContactNumber: this.form['patientContactNumber'].value!
      };

      this.store.dispatch(new UpdatePatient(updatedPatient)).subscribe({
        next: () => this.router.navigate(['/patients'])
      });
    }
  }

  backToList(): void {
    this.router.navigate(['/patients']);
  }
}
