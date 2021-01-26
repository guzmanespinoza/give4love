import { ResponseModel, ResponseModelById } from './../models/response-model';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AppGlobals } from '../App.Globals';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  apiUrl: string = `${this.app.serverURL}/clients`;
  apiUrlRefund: string = `${this.app.serverURL}/refund`;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, private app: AppGlobals, private auth:AuthService) { }

  getAll() {
    let uri = `${this.apiUrl}?page[offset]=0&page[limit]=20`
    return this.http.get(uri);
  }

  getById(id):Observable<ResponseModelById> {
    let uri = `${this.apiUrl}${id}`
    return this.http.get<ResponseModelById>(uri);
  }

  create(data: any): Observable<any> {
    delete data.password2;
    console.log(data.image);
    console.warn(data);
    let body = {
      data: {
        type: "clients",
        attributes: {
          ...data,
          status: "enable",
          is_blocked: false,
          id_strategy: ""
        }
      }
    };
    console.log('body', body);
    let uri = `${this.apiUrl}`;
    return this.http.post(uri, JSON.stringify(body), { headers: this.headers }).pipe(
      catchError(this.error)
    )
  }

  createService() {
    let body = {
      "data": {
        "type": "clients",
        "attributes": {
          "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9YGARc5KB0XV+IAAAAddEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIFRoZSBHSU1Q72QlbgAAAF1JREFUGNO9zL0NglAAxPEfdLTs4BZM4DIO4C7OwQg2JoQ9LE1exdlYvBBeZ7jqch9//q1uH4TLzw4d6+ErXMMcXuHWxId3KOETnnXXV6MJpcq2MLaI97CER3N0vr4MkhoXe0rZigAAAABJRU5ErkJggg",
          "name": "Abdiel Martinez",
          "phone": "12123",
          "cell_phone": "123123",
          "email": "l",
          "password": "123456",
          "address": {
            "text": "por ahi",
            "postal_code": "123123",
            "street": "7ma calle",
            "street_line": "por ahi",
            "city": "Quezaltepeque",
            "state": "enable"
          },
          "status": "enable",
          "is_blocked": false,
          "id_strategy": ""
        }
      }
    }

  
    console.log('body', body);
    let uri = `${this.apiUrl}`;
    return this.http.post(uri, JSON.stringify(body), { headers: this.headers }).pipe(
      catchError(this.error)
    )
  }

  update(id, data): Observable<any> {
    let uri = `${this.apiUrl}/${id}`;
    return this.http.patch(uri, data, { headers: this.headers }).pipe(
      catchError(this.error)
    )
  }

  refund(data): Observable<ResponseModel> {
    let uri = `${this.apiUrlRefund}`;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization': this.auth.getJwt() });
    return this.http.post<ResponseModel>(uri, data, { headers: headers }).pipe(
      catchError(this.error)
    )
  }

  delete(id): Observable<any> {
    var api = `${this.apiUrl}/${id}`;
    return this.http.delete(api).pipe(
      catchError(this.error)
    )
  }



  clientsPatch(data): Observable<ResponseModel> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization': this.auth.getJwt() });
   console.log(this.auth.getJwt());
    let url = `${this.apiUrl}/${data.data.id}`;
    let body = JSON.stringify(data);
    let options = { headers: headers };
    return this.http.patch<ResponseModel>(url, body, options).pipe(
      catchError(this.error)
    );
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
