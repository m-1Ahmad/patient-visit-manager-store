import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { AuthModel } from './auth.model';
import { Login, LoginSuccess, Signup, Logout } from './auth.actions';
import { AuthService } from '../../services/auth/auth.service';
import { tap } from 'rxjs/operators';

@State<AuthModel>({
  name: 'auth',
  defaults: {
    token: null,
    role: null
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
        ctx.dispatch(new LoginSuccess(response.token, response.user.userRole));
      })
    );
  }

  @Action(LoginSuccess)
  loginSuccess(ctx: StateContext<AuthModel>, action: LoginSuccess) {
    ctx.patchState({
      token: action.token,
      role: action.role
    });
  }

  @Action(Signup)
  signup(ctx: StateContext<AuthModel>, action: Signup) {
    return this.authService.signup(action.payload);
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthModel>) {
    ctx.setState({
      token: null,
      role: null
    });
  }
}
