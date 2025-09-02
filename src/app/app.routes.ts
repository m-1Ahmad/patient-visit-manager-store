import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { SignupComponent } from './features/auth/signup/signup.component';
import { UsersComponent } from './features/users/users.component';
import { authGuard } from './core/guards/auth.guard';
import { VisitsComponent } from './features/visits/visits.component';
import { DoctorsComponent } from './features/doctors/doctors.component';
import { PatientsComponent } from './features/patients/patients.component';
import { PatientAddComponent } from './features/patients/add-patient/add-patient.component';
import { PatientUpdateComponent } from './features/patients/update-patient/update-patient.component';
import { DoctorAddComponent } from './features/doctors/add-doctor/add-doctor.component';
import { DoctorUpdateComponent } from './features/doctors/update-doctor/update-doctor.component';
import { VisitAddComponent } from './features/visits/add-visit/add-visit.component';
import { NotAuthorizeComponent } from './features/auth/not-authorize/not-authorize.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { VisitUpdateComponent } from './features/visits/update-visit/update-visit.component';

export const ROUTES: Routes = [
  {path: '', redirectTo:'/dashboard', pathMatch: 'full'},
  {path: 'auth/login', component:LoginComponent},
  {path: 'auth/signup', component:SignupComponent},
  {path: 'auth/unauthorized', component: NotAuthorizeComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [authGuard], data: {roles: ['Admin', 'Doctor', 'Receptionist']}},
  {path: 'users', component: UsersComponent, canActivate: [authGuard], data: {roles: ['Admin']}},
  {path: 'patients', component: PatientsComponent, canActivate: [authGuard], data: {roles: ['Admin', 'Receptionist']}},
  {path: 'add/patient', component: PatientAddComponent, canActivate: [authGuard], data: {roles: ['Admin', 'Receptionist']}},
  {path: 'update/patient/:id', component: PatientUpdateComponent, canActivate: [authGuard], data: {roles: ['Admin', 'Receptionist']}},
  {path: 'visits', component: VisitsComponent, canActivate: [authGuard], data: {roles: ['Admin', 'Doctor', 'Receptionist']}},
  {path: 'add/visit', component: VisitAddComponent, canActivate: [authGuard], data: {roles: ['Admin', 'Doctor', 'Receptionist']}},
  {path: 'update/visit/:id', component: VisitUpdateComponent, canActivate: [authGuard], data: {roles: ['Admin', 'Doctor', 'Receptionist']}},
  {path: 'doctors', component: DoctorsComponent, canActivate: [authGuard], data: {roles: ['Admin', 'Doctor']}},
  {path: 'add/doctor', component: DoctorAddComponent, canActivate: [authGuard], data: {roles: ['Admin', 'Doctor']}},
  {path: 'update/doctor/:id', component: DoctorUpdateComponent, canActivate: [authGuard], data: {roles: ['Admin', 'Doctor']}},
  {path: '**', redirectTo: '/dashboard'},
];
