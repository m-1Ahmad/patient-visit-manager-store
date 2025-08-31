import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Doctor } from '../../core/models/doctor';
import { LoadDoctors, DeleteDoctor } from '../../core/store/doctors/doctors.actions';
import { AsyncPipe } from '@angular/common';
import { DoctorsState } from '../../core/store/doctors/doctors.state';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.scss'
})
export class DoctorsComponent {
  @Select(DoctorsState.doctors) doctors$!: Observable<Doctor[]>;

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(new LoadDoctors());
  }

  onDelete(doctorId: number): void {
    if (confirm('Are you sure you want to delete this doctor?')) {
      this.store.dispatch(new DeleteDoctor(doctorId));
    }
  }

  navigateToAdd(): void {
    this.router.navigate(['/add/doctor']);
  }

  onUpdate(doctorId: number): void {
    this.router.navigate(['/update/doctor', doctorId]);
  }
}
