import { ICity } from './city.interface';
import { IState } from './state.interface';

export interface IAddress {
    type: string,
    street1: string,
    street2: string,
    city: ICity,
    state: IState
}