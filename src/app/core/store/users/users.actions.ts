import { User } from '../../models/user';

export class LoadUsers {
  static readonly type = '[Users] Load';
}

export class AddUser {
  static readonly type = '[Users] Add';
  constructor(public payload: User) {}
}

export class UpdateUser {
  static readonly type = '[Users] Update';
  constructor(public payload: User) {}
}

export class DeleteUser {
  static readonly type = '[Users] Delete';
  constructor(public id: number) {}
}
