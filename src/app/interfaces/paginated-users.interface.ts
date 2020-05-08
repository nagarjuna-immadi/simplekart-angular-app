import { IUser } from './user.interface';
export interface IPaginatedUsers {
    totalItems: number,
    data: IUser[]
}