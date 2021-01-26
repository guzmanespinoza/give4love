import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AppGlobals } from '../App.Globals';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiAuthService {

  private apiUrl: string = `${this.app.serverURL}/auth`;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, private app: AppGlobals) { }



  login(data: any): Observable<any> {
    let uri = `${this.apiUrl}/login`;
    return this.http.post<any>(uri, data, { headers: this.headers }).pipe(
      catchError(this.error)
    )
  }

  error(error: HttpErrorResponse) {
    // debugger;
    let errorMessage = '';
    if (error.error) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }


}
