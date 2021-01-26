import { ResponseModel } from './../models/response-model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AppGlobals } from '../App.Globals';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiUsersService {

  apiUrl: string = `${this.app.serverURL}/users`;
  serverURL: string = `${this.app.serverURL}`;

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, private app: AppGlobals) { }

  getAll() {
    let uri = `${this.apiUrl}?page[offset]=0&page[limit]=20`
    return this.http.get(uri);
  }

  getById(id) {
    let uri = `${this.apiUrl}${id}`
    return this.http.get(uri);
  }

  getDonations(id):Observable<ResponseModel> {
    let uri = `${this.serverURL}/donation/client/${id}?page[offset]=0&page[limit]=200`;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization': 'Bearer ' + atob(sessionStorage.getItem(btoa('donante-jwt'))) });
    return this.http.get<ResponseModel>(uri, { headers: headers });
  }

  pay(data): Observable<any> {
    let uri = `${this.serverURL}/donation`;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization': 'Bearer ' + atob(sessionStorage.getItem(btoa('donante-jwt'))) });
    return this.http.post(uri, data, { headers: headers }).pipe(
      catchError(this.error)
    )
  }

  create(data): Observable<any> {
    let uri = `${this.apiUrl}`;
    return this.http.post(uri, data, { headers: this.headers }).pipe(
      catchError(this.error)
    )
  }

  update(id, data): Observable<any> {
    let uri = `${this.apiUrl}/${id}`;
    return this.http.patch(uri, data, { headers: this.headers }).pipe(
      catchError(this.error)
    )
  }

  deleteUser(id): Observable<any> {
    var api = `${this.apiUrl}/${id}`;
    return this.http.delete(api).pipe(
      catchError(this.error)
    )
  }

  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }




}
