import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AppGlobals } from '../App.Globals';
import { ResponseModel, ResponseModelById } from '../models/response-model';

@Injectable({
  providedIn: 'root'
})
export class ApiPartnerService {

  apiUrl: string = `${this.app.serverURL}/partners`;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, private app: AppGlobals) { }

  getAll(offset, limit):Observable<ResponseModel> {
    let uri = `${this.apiUrl}?page[offset]=${offset}&page[limit]=${limit}`
    return this.http.get<ResponseModel>(uri);
  }

  getById(id):Observable<ResponseModelById> {
    let uri = `${this.apiUrl}/${id}?page[offset]=0&page[limit]=200`
    return this.http.get<ResponseModelById>(uri);
  }

  getDonationTypes(idPartner){
    let uri = `${this.apiUrl}/${idPartner}/donation-types?page[offset]=0&page[limit]=200`
    return this.http.get<ResponseModel>(uri);
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

  delete(id): Observable<any> {
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
