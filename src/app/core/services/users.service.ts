import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { IPaginatedUsers } from '../../interfaces/paginated-users.interface';
import { IPaginationSettings } from '../../interfaces/pagination-settings.interface';
import { IUser } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public getUsers(paginationSettings: IPaginationSettings): Observable<IPaginatedUsers> {
    let params = new HttpParams({fromObject: <any>paginationSettings});
    
    return this.http.get(`${this.baseUrl}/user`, { params: params} )
      .pipe(
        map(data => data as IPaginatedUsers)
      );
  }

  public getUser(userId: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.baseUrl}/user/${userId}`).pipe(
      map(data => data as IUser)
    );
  }

  public deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/user/${userId}`);
  }

  public addUser(payload): Observable<any> {
    payload.password = 'test123';
    return this.http.post<any>(`${this.baseUrl}/user/signup`, payload)
      .pipe(
        map(data => {
          return data;
        },
        catchError(error => {
          return error;
        }))
      );
  }

  public updateUser(userId, payload): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/user/${userId}`, payload)
      .pipe(
        map(data => {
          return data;
        },
        catchError(error => {
          return error;
        }))
      );
  }
}


