
import { ResponseModelById } from './../../models/response-model';
import { NotificationsService } from 'angular2-notifications';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements OnInit {

  @Output() btnSiguiente = new EventEmitter<any>();
  @Output() btnRegresar = new EventEmitter<any>();

  @Input() modoEdicion: boolean;



  @Input()
  get dataUserEdit(): ResponseModelById { return this._dataUserEdit; }
  set dataUserEdit(dataUserEdit: ResponseModelById) {
    this._dataUserEdit = dataUserEdit;
    this.temporalImage = 'assets/images/adjusterEmpty.png';
    if (dataUserEdit?.data.attributes.image != undefined) {
      this.temporalImage = dataUserEdit?.data.attributes.image;
     
    }


    this.userForm.get('data.id').setValue(dataUserEdit?.data.id);
    this.userForm.get('data.attributes.name').setValue(dataUserEdit?.data.attributes.name);
    this.userForm.get('data.attributes.phone').setValue(dataUserEdit?.data.attributes.phone);
    this.userForm.get('data.attributes.cell_phone').setValue(dataUserEdit?.data.attributes.cell_phone);
    this.userForm.get('data.attributes.email').setValue(dataUserEdit?.data.attributes.email);
    this.userForm.get('data.attributes.address.text').setValue(dataUserEdit?.data.attributes.address.text);
    this.userForm.get('data.attributes.address.postal_code').setValue(dataUserEdit?.data.attributes.address.postal_code);
    this.userForm.get('data.attributes.address.state').setValue(dataUserEdit?.data.attributes.address.state);
    this.userForm.get('data.attributes.address.street').setValue(dataUserEdit?.data.attributes.address.street);
    this.userForm.get('data.attributes.address.street_line').setValue(dataUserEdit?.data.attributes.address.street_line);
    this.userForm.get('data.attributes.address.city').setValue(dataUserEdit?.data.attributes.address.city);
  }

  _dataUserEdit: ResponseModelById;

  options = {
    position: ['bottom', 'right'],
    timeOut: 5000,
    lastOnBottom: true,
    showProgressBar: true,
    pauseOnHover: true, 
    clickToClose: true,
  };

  terminos = false;
  funcionario = false;



  userForm: FormGroup = new FormGroup({
    data: new FormGroup({
      type: new FormControl('clients', [Validators.required]),
      id: new FormControl(''),
      attributes: new FormGroup({
        image: new FormControl('', [Validators.required]),
        name: new FormControl('', [Validators.required]),
        phone: new FormControl('', [Validators.required]),
        cell_phone: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        password2: new FormControl('', [Validators.required]),
        status: new FormControl('enable', [Validators.required]),
        is_blocked: new FormControl('false', [Validators.required]),
        id_strategy: new FormControl(''),
        address: new FormGroup({
          text: new FormControl('', [Validators.required]),
          postal_code: new FormControl('', [Validators.required]),
          street: new FormControl('', [Validators.required]),
          street_line: new FormControl('', [Validators.required]),
          city: new FormControl('', [Validators.required]),
          state: new FormControl('', [Validators.required]),
        })
      })
    })
  });

  temporalImage = 'asets/images/adjusterEmpty.png';


  constructor(private _notify: NotificationsService) {

  }

  ngOnInit(): void {

  }

  get attributes_image(): any {
    return this.userForm.get('data.attributes.image');
  }

  get attributes(): any {
    return this.userForm.get('data.attributes');
  }

  submitted = false;

  submit() {
    this.submitted = true;
  
    this.attributes_image.setValue(this.temporalImage);
    
    
    if (this.userForm.valid) {
      if (this.userForm.get('data.attributes.password').value == this.userForm.get('data.attributes.password2').value) {
        if (this.validadorPasword()[0] && this.validadorPasword()[1] && this.validadorPasword()[2]) {
          this.btnSiguiente.emit(this.userForm.value);
        }
        else {
          this._notify.warn('Advertencia', 'Carácteristicas de Contraseña no validas.');
        }
      }
      else {
        this._notify.warn('Advertencia', 'Contraseñas no coinciden.');
      }

    }
    else {
      this._notify.warn('Advertencia', 'Formulario invalido.')
    }
  }

  regresar() {
    this.btnRegresar.emit("regresar");
  }

  cargarImagenUser(event) {
    for (let d of event.target.files) {
      let file = d;
      console.log(file.name);
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.temporalImage = reader.result.toString();
      };
    }
  }

  onSaveUsernameChanged(value: boolean) {
    this.terminos = value;
  }

  checkFuncionario(value: boolean) {
    this.funcionario = value;
  }
  checkTerminos(value: boolean) {
    this.terminos = value;
  }

  validadorPasword(): boolean[] {
    let respuesta: boolean[] = [false, false, false];

    var texto = this.userForm.get('data.attributes.password').value;
    for (let index = 0; index < texto.length; index++) {
      let letra = texto.charAt(index);
      let letras = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
      for (let i = 0; i < letras.length; i++) {
        if (letra == letras[i]) {
          respuesta[0] = true;
        }
      }
      let numberChars = "1234567890";
      for (let i = 0; i < numberChars.length; i++) {
        if (letra == numberChars[i]) {
          respuesta[1] = true;
        }
      }
      let specialChars = "!@#$^&%*()+=-[]\/{}|:<>?,.";
      for (let i = 0; i < specialChars.length; i++) {
        if (letra == specialChars[i]) {
          respuesta[2] = true;
        }
      }
    }
    return respuesta;
  }

}
