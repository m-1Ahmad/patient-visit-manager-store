import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Patient } from '../../core/models/patient';
import { LoadPatients, DeletePatient } from '../../core/store/patients/patients.actions';
import { AsyncPipe } from '@angular/common';
import { PatientsState } from '../../core/store/patients/patients.state';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.scss'
})
export class PatientsComponent {
  @Select(PatientsState.patients) patients$!: Observable<Patient[]>;

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(new LoadPatients());
  }

  onDelete(patientId: number): void {
    if (confirm('Are you sure you want to delete the data?')) {
      this.store.dispatch(new DeletePatient(patientId));
    }
  }

  navigateToAdd(): void {
    this.router.navigate(['/add/patient']);
  }

  onUpdate(patientId: number): void {
    this.router.navigate(['/update/patient', patientId]);
  }
}
