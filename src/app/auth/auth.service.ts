/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null);

  private _userIsAuthenticated = false;
  private baseUrl = 'http://localhost:8080/api/Auth';

  constructor(private http: HttpClient) {}

  get userIsAuthenticated() {
    return this._userIsAuthenticated;
  }

  login() {
    this._userIsAuthenticated = true;
  }

  logout() {
    this._userIsAuthenticated = false;
    this.user.next(null);
  }

  loginUser(username, password) {
    const userData = JSON.stringify({ username, password });
    return this.http.post<any>(`${this.baseUrl}/login`, userData).pipe(
      tap((data) => {
        console.log(data.length);
        if (data.length !== 0) {
          this.handleAuthentication(data[0].id, data[0].name);
        }
      })
    );
  }

  public userregistration(username, password) {
    const userData = JSON.stringify({ username, password });
    return this.http
      .post<any>(`${this.baseUrl}/userregistration`, userData)
      .pipe(
        tap((data) => {
          if (data.data) {
            this.handleAuthentication(data.data.id, data.data.name);
          }
        })
      );
  }

  updateUser(name, password, id){
    const userData = JSON.stringify({ name, password, id });
    this.http
      .post<any>(`${this.baseUrl}/updateUser`, userData).subscribe(data => {
        console.log(data);
      });
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);

    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }

  private handleAuthentication(id: string, name: string) {
    const user = new User(id, name);
    this.user.next(user);
  }
}
