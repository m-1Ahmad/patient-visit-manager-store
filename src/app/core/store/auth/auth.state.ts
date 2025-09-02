import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { AuthModel } from './auth.model';
import { Login, Signup, Logout } from './auth.actions';
import { AuthService } from '../../services/auth/auth.service';
import { tap } from 'rxjs/operators';

@State<AuthModel>({
  name: 'auth',
  defaults: {
    token: null,
    role: null,
    userId: null
  }
})
@Injectable()
export class AuthState {
  constructor(private authService: AuthService) {}

  @Selector()
  static token(state: AuthModel) {
    return state.token;
  }

  @Selector()
  static role(state: AuthModel) {
    return state.role;
  }

  @Selector()
  static userId(state: AuthModel) {
    return state.userId;
  }

  @Selector()
  static isLoggedIn(state: AuthModel) {
    if (state.token) {
      return true;
    }
    else {
      return false;
    }
  }

  @Action(Login)
  login(ctx: StateContext<AuthModel>, action: Login) {
    return this.authService.login({ email: action.email, password: action.password }).pipe(
      tap(response => {
        ctx.patchState({
          token: response.token,
          role: response.user.userRole,
          userId: response.user.userId
        });
      })
    );
  }

  @Action(Signup)
  signup(ctx: StateContext<AuthModel>, action: Signup) {
    return this.authService.signup(action.payload);
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthModel>) {
    ctx.setState({
      token: null,
      role: null,
      userId: null
    });
  }
}
