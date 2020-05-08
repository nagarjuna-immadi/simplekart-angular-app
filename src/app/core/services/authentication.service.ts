import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { currentUser } from '../../interfaces/current-user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public baseUrl: string = environment.baseUrl;
  private currentUser: currentUser;
  private token: String;
  private authenticationSubject: BehaviorSubject<any>;
  public authentication$: Observable<any>;

  constructor(private http: HttpClient, private router: Router) {
    this.setLoginDataOnPageLoad();
  }

  private setLoginDataOnPageLoad() {
    let currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.currentUser = JSON.parse(currentUser);
    }

    this.token = localStorage.getItem('token');

    this.authenticationSubject = new BehaviorSubject({
      isLoggedIn: this.isLoggedIn(),
      isAdmin: this.isAdmin(),
      currentUser: this.currentUser
    });

    this.authentication$ = this.authenticationSubject.asObservable();
  }
  
  login(payload): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/user/login`, payload)
      .pipe(
        map(data => {
          if (data && data.token) {
            localStorage.setItem('token', data.token);
            this.token = data.token;
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            this.currentUser = data.user;
            this.authenticationSubject.next({
              isLoggedIn: true,
              isAdmin: this.isAdmin(),
              currentUser: data.user
            });
          }
          return data;
        },
          catchError(error => {
            return error;
          }))
      );
  }

  signup(payload): Observable<any> {
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

  logout() {
    this.token = '';
    this.currentUser = null;
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');

    this.authenticationSubject.next({
      isLoggedIn: false,
      isAdmin: false,
      currentUser: null
    });

    this.router.navigate(['/home']);

  }

  isAdmin(): boolean {
    return this.currentUser && this.currentUser.roles.indexOf('admin') !== -1 ? true : false;
  }

  isLoggedIn(): boolean {
    return this.token && this.currentUser ? true : false;
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

}
