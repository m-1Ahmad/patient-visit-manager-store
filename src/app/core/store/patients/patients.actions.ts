import { Patient } from '../../models/patient';

export class LoadPatients {
  static readonly type = '[Patients] Load';
}

export class AddPatient {
  static readonly type = '[Patients] Add';
  constructor(public payload: Patient) {}
}

export class UpdatePatient {
  static readonly type = '[Patients] Update';
  constructor(public payload: Patient) {}
}

export class DeletePatient {
  static readonly type = '[Patients] Delete';
  constructor(public id: number) {}
}
