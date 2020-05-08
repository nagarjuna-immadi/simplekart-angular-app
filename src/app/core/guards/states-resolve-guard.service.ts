import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { AddressService } from '../services/address.service';
import { IState } from '../../interfaces/state.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatesResolveGuardService implements Resolve<IState[]>{

  constructor(private addressService: AddressService) { }

  resolve(): Observable<IState[]> {
    return this.addressService.getStates();
  }
}
