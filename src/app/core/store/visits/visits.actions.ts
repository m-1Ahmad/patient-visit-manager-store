import { Visit } from '../../models/visit';

export class LoadVisits {
  static readonly type = '[Visits] Load';
}

export class AddVisit {
  static readonly type = '[Visits] Add';
  constructor(public payload: Visit) {}
}

export class UpdateVisit {
  static readonly type = '[Visits] Update';
  constructor(public payload: Visit) {}
}

export class DeleteVisit {
  static readonly type = '[Visits] Delete';
  constructor(public id: number) {}
}
