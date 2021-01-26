import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  options = {
    position: ['bottom', 'right'],
    timeOut: 5000,
    lastOnBottom: true,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true,
  };

  constructor(private spinner: NgxSpinnerService, private _notify:NotificationsService, private router:Router, private api:ApiService,  private authService: AuthService) { }

  ngOnInit(): void {
    sessionStorage.removeItem('g4l-user');
  }

  iniciarSesion(event){
    this.spinner.show();
    console.log(event);
    this.api.login(event).subscribe(
      (respose)=>{
      console.log(respose);
      if(respose.user.id_partner!=''){
        this.spinner.hide();
        sessionStorage.setItem('g4l-user', JSON.stringify(respose));
        this.authService.setJwt('Bearer '+respose.token);
        this.router.navigateByUrl('/home');
      }
      else{
        this.spinner.hide();
        this._notify.warn('Advertencia', 'Usuario no valido');
      }
    },
    (error)=>{
      this.spinner.hide();
      this._notify.warn('Advertencia', 'Credenciales invalidas');
    })
  }

  registrate(event){
    console.log(event);
    this.router.navigateByUrl('/sign-up');
  }
  

}
