import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { UsersModel } from './users.model';
import { UserService } from '../../services/user/user.service';
import { LoadUsers, AddUser, UpdateUser, DeleteUser } from './users.actions';
import { tap } from 'rxjs/operators';

@State<UsersModel>({
  name: 'users',
  defaults: {
    users: []
  }
})
@Injectable()
export class UsersState {
  constructor(private userService: UserService) {}

  @Selector()
  static users(state: UsersModel) {
    return state.users;
  }

  @Action(LoadUsers)
  loadUsers(ctx: StateContext<UsersModel>) {
    return this.userService.getUsers().pipe(
      tap(users => ctx.patchState({ users }))
    );
  }

  @Action(DeleteUser)
  deleteUser(ctx: StateContext<UsersModel>, action: DeleteUser) {
    return this.userService.deleteUser(action.id).pipe(
      tap(() => {
        const state = ctx.getState();
        ctx.patchState({
          users: state.users.filter(u => u.userId !== action.id)
        });
      })
    );
  }
}
