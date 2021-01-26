import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';


@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent implements OnInit {

  @Output() btnIngresar = new EventEmitter<any>();
  @Output() btnRegistrate = new EventEmitter<any>();

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


  constructor(private _notify: NotificationsService) {

  }
  ngOnInit(): void {
  }

  submit() {
    if (this.loginForm.valid) {  
      this.btnIngresar.emit(this.loginForm.value);
    }
    else {
      this._notify.warn('Advertencia', 'Formulario invalido.')
    }
  }

  registrar() {
    this.btnRegistrate.emit("Ingresar");
  }

}
