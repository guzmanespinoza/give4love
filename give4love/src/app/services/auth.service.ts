import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getJwt(): string {
    
    return 'Bearer '+ atob(sessionStorage.getItem(btoa('donante-jwt')));
  }

  setJwt(jwt: string) {
    sessionStorage.setItem(btoa('donante-jwt'), btoa(jwt));
  }

  // getJwtExp(jwt: string) {
  //   let decode = jwt_decode(jwt);
  //   if (decode.exp === undefined) {
  //     return null;
  //   }
  //   else {
  //     return decode.exp*1000;
  //   }
  // }

  // isJwtExpired(jwt?: string) {
  //   if (!jwt) jwt = this.getJwt();
  //   if (!jwt) return false;
  //   let date = this.getJwtExp(jwt);
  //   if (date === undefined) return false;
  //   return date > Date.now();
  // }


}
