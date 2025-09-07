export interface Leads {
  id?: number;
  full_name: string;
  email: string;
  phone?: string;
  message?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}
