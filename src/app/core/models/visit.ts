export interface Visit {
  visitId: number;
  patientId: number;
  visitDate: string | null;
  visitDescription: string | null;
  visitTypeId: number;
  doctorId: number;
  duration: number | null;
}
