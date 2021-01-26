import { retry, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AppGlobals } from '../App.Globals';
import { ResponseLogin, ResponseModel, ResponseModelById } from '../models/response-model';
import { AuthService } from './auth.service';
// import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  urlServer: string;


  constructor(private http: HttpClient, private appGlobals: AppGlobals, private authService: AuthService) {
    this.urlServer = `${appGlobals.serverURL}`;
  }

 
 
  ejemplo(data): Observable<ResponseModel> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8'/*, 'Authorization': this.authService.getJwt()*/ });
    let url = `${this.urlServer}/partners`;
    let body = JSON.stringify(data);
    let options = { headers: headers };
    return this.http.post<ResponseModel>(url, body, options).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  login(data): Observable<ResponseLogin> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8'});
    let url = `${this.urlServer}/auth/login`;
    let body = JSON.stringify(data);
    let options = { headers: headers };
    return this.http.post<ResponseLogin>(url, body, options).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  partnersPost(data): Observable<ResponseModelById> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8'});
    let url = `${this.urlServer}/partners`;
    let body = JSON.stringify(data);
    let options = { headers: headers };
    return this.http.post<ResponseModelById>(url, body, options).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
  partnersPatch(data): Observable<ResponseModel> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization': this.authService.getJwt() });
    let url = `${this.urlServer}/partners/${data.data.id}`;
    let body = JSON.stringify(data);
    let options = { headers: headers };
    return this.http.patch<ResponseModel>(url, body, options).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  usersPost(data): Observable<ResponseModel> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8'});
    let url = `${this.urlServer}/users`;
    let body = JSON.stringify(data);
    let options = { headers: headers };
    return this.http.post<ResponseModel>(url, body, options).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  usersPatch(data): Observable<ResponseModel> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization': this.authService.getJwt() });
    let url = `${this.urlServer}/users/${data.data.id}`;
    let body = JSON.stringify(data);
    let options = { headers: headers };
    return this.http.patch<ResponseModel>(url, body, options).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  donationTypesPost(data): Observable<ResponseModel> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8'});
    let url = `${this.urlServer}/donation-types`;
    let body = JSON.stringify(data);
    let options = { headers: headers };
    return this.http.post<ResponseModel>(url, body, options).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
  
  refundPost(data): Observable<ResponseModel> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization': this.authService.getJwt() });
    let url = `${this.urlServer}/refund`;
    let body = JSON.stringify(data);
    let options = { headers: headers };
    return this.http.post<ResponseModel>(url, body, options).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  donationTypesPatch(data): Observable<ResponseModel> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization': this.authService.getJwt() });
    let url = `${this.urlServer}/donation-types/${data.data.id}`;
    let body = JSON.stringify(data);
    let options = { headers: headers };
    return this.http.patch<ResponseModel>(url, body, options).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // /partners/{{partner-id}}/donation-types
  // donationTypesPost(data): Observable<ResponseModel> {
  //   let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8'});
  //   let url = `${this.urlServer}/donation-types`;
  //   let body = JSON.stringify(data);
  //   let options = { headers: headers };
  //   return this.http.post<ResponseModel>(url, body, options).pipe(
  //     retry(1),
  //     catchError(this.handleError)
  //   );
  // }

  getDonationTypes(id): Observable<ResponseModel> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8'});
    let url = `${this.urlServer}/partners/${id}/donation-types`;
    let options = { headers: headers };
    return this.http.get<ResponseModel>(url, options).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getPartnerById(id): Observable<ResponseModelById> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8'});
    let url = `${this.urlServer}/partners/${id}`;
    let options = { headers: headers };
    return this.http.get<ResponseModelById>(url, options).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getDonationByPartner(id): Observable<ResponseModelById> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization': this.authService.getJwt() });
    let url = `${this.urlServer}/donation/partner/${id}`;
    let options = { headers: headers };
    return this.http.get<ResponseModelById>(url, options).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getRefundByPartner(id): Observable<ResponseModelById> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization': this.authService.getJwt() });
    let url = `${this.urlServer}/refund/partner/${id}`;
    let options = { headers: headers };
    return this.http.get<ResponseModelById>(url, options).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }


  getUserById(id): Observable<ResponseModelById> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8'});
    let url = `${this.urlServer}/users/${id}`;
    let options = { headers: headers };
    return this.http.get<ResponseModelById>(url, options).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }


  statics(id): Observable<ResponseModelById> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization': this.authService.getJwt() });
    let url = `${this.urlServer}/donation/statics/${id}`;
    let options = { headers: headers };
    return this.http.get<ResponseModelById>(url, options).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
 

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
