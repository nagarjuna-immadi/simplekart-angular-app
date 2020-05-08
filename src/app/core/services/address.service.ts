import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IState } from '../../interfaces/state.interface';
import { ICity } from '../../interfaces/city.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public getStates(): Observable<IState[]> {
    return this.http.get(`${this.baseUrl}/states`).pipe(
      map(data => data as IState[])
    );
  }
  
  public getCities(stateId: string): Observable<ICity[]> {
    return this.http.get(`${this.baseUrl}/cities/${stateId}`).pipe(
      map(data => data as ICity[])
    );
  }

}
