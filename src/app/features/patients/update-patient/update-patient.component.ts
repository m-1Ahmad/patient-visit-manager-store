import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../../../core/services/patient/patient.service';
import { Patient } from '../../../core/models/patient';
import { LettersOnlyDirective } from '../../../shared/Directives/letteronly.directive';

@Component({
  selector: 'app-patient-update',
  standalone: true,
  imports: [ReactiveFormsModule, LettersOnlyDirective],
  templateUrl: './update-patient.component.html',
  styleUrl: './update-patient.component.scss'
})
export class PatientUpdateComponent {
  patientForm: FormGroup;
  patientId: number | null = null;

  constructor(private patientService: PatientService,private router: Router,private route: ActivatedRoute) {
    this.patientForm = new FormGroup({
      patientFirstName: new FormControl('', Validators.required),
      patientLastName: new FormControl('', Validators.required),
      patientEmail: new FormControl('', [Validators.required, Validators.email]),
      patientContactNumber: new FormControl('', Validators.required)
    });
  }

  get form() {
    return this.patientForm.controls;
  }

  ngOnInit(): void {
    this.patientId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.patientId) {
      this.patientService.getPatients().subscribe(patients => {
        const patient = patients.find(p => p.patientId === this.patientId);
        if (patient) {
          this.patientForm.patchValue({
            patientFirstName: patient.patientFirstName,
            patientLastName: patient.patientLastName,
            patientEmail: patient.patientEmail,
            patientContactNumber: patient.patientContactNumber
          });
        }
      });
    }
  }

  onSubmit(): void {
    if (this.patientForm.valid && this.patientId) {
      const updatedPatient: Patient = {
        patientId: this.patientId!,
        patientFirstName: this.form['patientFirstName'].value,
        patientLastName: this.form['patientLastName'].value,
        patientEmail: this.form['patientEmail'].value,
        patientContactNumber: this.form['patientContactNumber'].value
      };

      this.patientService.updatePatient(updatedPatient);
      this.router.navigate(['/patients']);
    }
  }
  backToList(): void{
    this.router.navigate(['/patients']);
  }
}
