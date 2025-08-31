import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { ROUTES } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from './core/store/auth/auth.state';
import { PatientsState } from './core/store/patients/patients.state';
import { DoctorsState } from './core/store/doctors/doctors.state';
import { VisitsState } from './core/store/visits/visits.state';
import { UsersState } from './core/store/users/users.state';
import { NgxsStoragePluginModule, StorageOption } from '@ngxs/storage-plugin';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(ROUTES),
    provideHttpClient(withInterceptors([authInterceptor])),
    importProvidersFrom(
      NgxsModule.forRoot([AuthState, PatientsState, DoctorsState, VisitsState, UsersState]),
      NgxsStoragePluginModule.forRoot({
        key: 'auth',
        storage: StorageOption.SessionStorage
      })
    )
  ]
};
