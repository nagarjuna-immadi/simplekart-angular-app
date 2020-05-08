import { IState } from './state.interface';

export interface ICity {
    _id: string,
    name: string,
    state?: IState | string
}