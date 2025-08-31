export class Login {
  static readonly type = '[Auth] Login';
  constructor(public email: string, public password: string) {}
}

export class LoginSuccess {
  static readonly type = '[Auth] Login Success';
  constructor(public token: string, public role: string) {}
}

export class Signup {
  static readonly type = '[Auth] Signup';
  constructor(public payload: any) {}
}

export class Logout {
  static readonly type = '[Auth] Logout';
}
