import { Doctor } from '../../models/doctor';

export class LoadDoctors {
  static readonly type = '[Doctors] Load';
}

export class AddDoctor {
  static readonly type = '[Doctors] Add';
  constructor(public payload: Doctor) {}
}

export class UpdateDoctor {
  static readonly type = '[Doctors] Update';
  constructor(public payload: Doctor) {}
}

export class DeleteDoctor {
  static readonly type = '[Doctors] Delete';
  constructor(public id: number) {}
}
