import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VisitService } from '../../core/services/visit/visit.service';
import { Visit } from '../../core/models/visit';
import { PatientService } from '../../core/services/patient/patient.service';
import { DoctorService } from '../../core/services/doctor/doctor.service';
import { Patient } from '../../core/models/patient';
import { Doctor } from '../../core/models/doctor';

@Component({
  selector: 'app-visit-list',
  templateUrl: './visits.component.html',
  standalone: true,
  imports:[],
  styleUrl: './visits.component.scss'
})
export class VisitsComponent {
  visits: Visit[] = [];
  patients: Patient[] = [];
  doctors: Doctor[] = [];

  visitTypes: Record<number,string> = {
    1: 'Consultation',
    2: 'Follow Up',
    3: 'Emergency'
  };

  constructor(private visitService: VisitService,private patientService: PatientService,private doctorService: DoctorService,
    private router: Router) {}

  ngOnInit(): void {
    this.visitService.getVisits().subscribe(data => this.visits = data);
    this.patientService.getPatients().subscribe(data => this.patients = data);
    this.doctorService.getDoctors().subscribe(data => this.doctors = data);
  }

  onDelete(id: number): void {
    if(confirm("Are you sure to delete this visit?")) {
      this.visitService.deleteVisit(id);
    }
  }

  onUpdate(id: number): void {
    this.router.navigate(['/update/visit', id]);
  }

  navigateToAdd(): void {
    this.router.navigate(['/add/visit']);
  }

  getPatientName(id: number): string {
    const patient = this.patients.find(p => p.patientId === id);
    return patient ? `${patient.patientFirstName} ${patient.patientLastName}` : '';
  }

  getDoctorName(id: number): string {
    const doctor = this.doctors.find(d => d.doctorId === id);
    return doctor ? `${doctor.doctorFirstName} ${doctor.doctorLastName}` : '';
  }
}
