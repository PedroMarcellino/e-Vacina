export interface Vaccines {
  id?: number;
  name: string;
  age_range: string;
  status: string;
  application_date: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}