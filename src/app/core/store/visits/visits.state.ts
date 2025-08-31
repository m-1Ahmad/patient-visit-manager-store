import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { VisitsModel } from './visits.model';
import { VisitService } from '../../services/visit/visit.service';
import { LoadVisits, AddVisit, UpdateVisit, DeleteVisit } from './visits.actions';
import { tap } from 'rxjs/operators';

@State<VisitsModel>({
  name: 'visits',
  defaults: {
    visits: []
  }
})
@Injectable()
export class VisitsState {
  constructor(private visitService: VisitService) {}

  @Selector()
  static visits(state: VisitsModel) {
    return state.visits;
  }

  @Action(LoadVisits)
  loadVisits(ctx: StateContext<VisitsModel>) {
    return this.visitService.getVisits().pipe(
      tap(visits => ctx.patchState({ visits }))
    );
  }

  @Action(AddVisit)
  addVisit(ctx: StateContext<VisitsModel>, action: AddVisit) {
    return this.visitService.addVisit(action.payload).pipe(
      tap(() => {
        const state = ctx.getState();
        ctx.patchState({ visits: [...state.visits, action.payload] });
      })
    );
  }

  @Action(UpdateVisit)
  updateVisit(ctx: StateContext<VisitsModel>, action: UpdateVisit) {
    return this.visitService.updateVisit(action.payload).pipe(
      tap(() => {
        const state = ctx.getState();
        ctx.patchState({
          visits: state.visits.map(v =>
            v.visitId === action.payload.visitId ? action.payload : v
          )
        });
      })
    );
  }

  @Action(DeleteVisit)
  deleteVisit(ctx: StateContext<VisitsModel>, action: DeleteVisit) {
    return this.visitService.deleteVisit(action.id).pipe(
      tap(() => {
        const state = ctx.getState();
        ctx.patchState({
          visits: state.visits.filter(v => v.visitId !== action.id)
        });
      })
    );
  }
}
