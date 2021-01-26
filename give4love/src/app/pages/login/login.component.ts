import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApiAuthService } from 'src/app/services/api-auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
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

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private auth:AuthService, private apiLogin: ApiAuthService, private notify: NotificationsService, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    
  }

  login() {
    this.spinner.show();
    if (this.loginForm.valid) {
      this.apiLogin.login(this.loginForm.value).subscribe(response => {
        console.log(response);
        this.auth.setJwt(response.token);
        localStorage.setItem(btoa('donante-user'),btoa(JSON.stringify(response.user)));
        setTimeout(() => {
          this.spinner.hide();
          this.router.navigate(['/my-profile']);
        }, 2000);

      }, error => {
        console.log(error);
        this.spinner.hide();
        this.notify.warn('¡Advertencia!', 'Favor validar, las credenciales ingresadas son incorrectas.');
      });
    }
    else {
      this.spinner.hide();
      this.notify.warn('¡Advertencia!', 'Verifica tus datos.');
    }
  }

}
