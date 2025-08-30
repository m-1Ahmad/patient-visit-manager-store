import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from '../../core/models/doctor';
import { DoctorService } from '../../core/services/doctor/doctor.service';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [],
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent {
  doctors: Doctor[] = [];

  constructor(private doctorService: DoctorService, private router: Router) {}

  ngOnInit(): void {
    this.doctorService.getDoctors().subscribe(data => {
      this.doctors = data;
    });
  }

  onDelete(doctorId: number): void {
    if(confirm("Are you sure you want to delete this doctor?")){
      this.doctorService.deleteDoctor(doctorId);
      this.router.navigate(['/doctors']);
    }
  }

  navigateToAdd(): void {
    this.router.navigate(['/add/doctor']);
  }

  onUpdate(doctorId: number): void {
    this.router.navigate(['/update/doctor', doctorId]);
  }
}
