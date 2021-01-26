import { Router } from '@angular/router';
import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { ApiAuthService } from 'src/app/services/api-auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent implements OnInit {

  @Output() initSesion: EventEmitter<any> = new EventEmitter();
  @Output() signUp: EventEmitter<any> = new EventEmitter();
  
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

  constructor(private apiLogin: ApiAuthService, private notify: NotificationsService, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    
  }

  login() {
    this.spinner.show();
    if (this.loginForm.valid) {
      this.initSesion.emit(this.loginForm.value);
    }
    else {
      this.spinner.hide();
      this.notify.warn('¡Advertencia!', 'Verifica tus datos.');
    }
  }

  signUpMeth(){
    this.signUp.emit();
  }



}
