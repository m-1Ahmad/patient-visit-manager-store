import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { DoctorsModel } from './doctors.model';
import { DoctorService } from '../../services/doctor/doctor.service';
import { LoadDoctors, AddDoctor, UpdateDoctor, DeleteDoctor } from './doctors.actions';
import { tap } from 'rxjs/operators';

@State<DoctorsModel>({
  name: 'doctors',
  defaults: {
    doctors: []
  }
})
@Injectable()
export class DoctorsState {
  constructor(private doctorService: DoctorService) {}

  @Selector()
  static doctors(state: DoctorsModel) {
    return state.doctors;
  }

  @Action(LoadDoctors)
  loadDoctors(ctx: StateContext<DoctorsModel>) {
    return this.doctorService.getDoctors().pipe(
      tap((doctors) => ctx.patchState({ doctors }))
    );
  }

  @Action(AddDoctor)
  addDoctor(ctx: StateContext<DoctorsModel>, action: AddDoctor) {
    return this.doctorService.addDoctor(action.payload).pipe(
      tap((newDoctor) => {
        const state = ctx.getState();
        ctx.patchState({ doctors: [...state.doctors, newDoctor] });
      })
    );
  }

  @Action(UpdateDoctor)
  updateDoctor(ctx: StateContext<DoctorsModel>, action: UpdateDoctor) {
    return this.doctorService.updateDoctor(action.payload).pipe(
      tap((updatedDoctor) => {
        const state = ctx.getState();
        ctx.patchState({
          doctors: state.doctors.map(d =>
            d.doctorId === updatedDoctor.id ? updatedDoctor : d
          )
        });
      })
    );
  }

  @Action(DeleteDoctor)
  deleteDoctor(ctx: StateContext<DoctorsModel>, action: DeleteDoctor) {
    return this.doctorService.deleteDoctor(action.id).pipe(
      tap(() => {
        const state = ctx.getState();
        ctx.patchState({
          doctors: state.doctors.filter(d => d.doctorId !== action.id)
        });
      })
    );
  }
}
