import { IAddress } from './address.interface';

export interface IUser {
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    gender: string,
    isActive: boolean,
    addresses?: IAddress[]
}