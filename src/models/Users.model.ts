export interface Users {
    id?: number;
    name: string;
    email: string;
    photo_url?: string;
   // password?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
}