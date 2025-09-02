import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { PatientsModel } from './patients.model';
import { PatientService } from '../../services/patient/patient.service';
import { LoadPatients, AddPatient, UpdatePatient, DeletePatient } from './patients.actions';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@State<PatientsModel>({
  name: 'patients',
  defaults: {
    patients: []
  }
})
@Injectable()
export class PatientsState {
  constructor(private patientService: PatientService) {}

  @Selector()
  static patients(state: PatientsModel) {
    return state.patients;
  }

  @Action(LoadPatients)
  loadPatients(ctx: StateContext<PatientsModel>) {
    return this.patientService.getPatients().pipe(
      tap((patients) => ctx.patchState({ patients }))
    );
  }

  @Action(AddPatient)
  addPatient(ctx: StateContext<PatientsModel>, action: AddPatient) {
    return this.patientService.addPatient(action.payload).pipe(
      tap((newPatient) => {
        const state = ctx.getState();
        ctx.patchState({ patients: [...state.patients, newPatient] });
      })
    );
  }

  @Action(UpdatePatient)
  updatePatient(ctx: StateContext<PatientsModel>, action: UpdatePatient) {
    return this.patientService.updatePatient(action.payload).pipe(
      tap((updatedPatient) => {
        const state = ctx.getState();
        ctx.patchState({
          patients: state.patients.map(p =>
            p.patientId === updatedPatient.id ? updatedPatient : p
          )
        });
      })
    );
  }

  @Action(DeletePatient)
  deletePatient(ctx: StateContext<PatientsModel>, action: DeletePatient) {
    return this.patientService.deletePatient(action.id).pipe(
      tap(() => {
        const state = ctx.getState();
        ctx.patchState({
          patients: state.patients.filter(p => p.patientId !== action.id)
        });
      }),
      catchError((err) => {
        if(err.status == 500){
          alert('Patient cannot be deleted due to visit exists');
        }
        return throwError(() => err);
      })
    );
  }
}
