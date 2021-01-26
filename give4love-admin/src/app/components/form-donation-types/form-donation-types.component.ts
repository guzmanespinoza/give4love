import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';


@Component({
  selector: 'app-form-donation-types',
  templateUrl: './form-donation-types.component.html',
  styleUrls: ['./form-donation-types.component.scss']
})
export class FormDonationTypesComponent implements OnInit {

  @Output() btnSiguiente = new EventEmitter<any>();
  @Output() btnRegresar = new EventEmitter<any>();

  @Input() modoEdicion: boolean;

  @Input()
  get dataType(): any { return this._dataType; }
  set dataType(dataType: any) {
    this._dataType=dataType;
    this.donationTypeForm.get('data.id').setValue( dataType.id);
    this.donationTypeForm.get('data.attributes.description').setValue( dataType?.attributes.description);
    this.donationTypeForm.get('data.attributes.is_active').setValue( dataType?.attributes.is_active);
    this.donationTypeForm.get('data.attributes.id_partner').setValue( dataType?.attributes.id_partner);
  }

  _dataType: any;

  userSesion = JSON.parse(sessionStorage.getItem('g4l-user'));

  options = {
    position: ['bottom', 'right'],
    timeOut: 5000,
    lastOnBottom: true,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true,
  };


  donationTypeForm: FormGroup = new FormGroup({
    data: new FormGroup({
      type: new FormControl('donation-types'),
      id: new FormControl(''),
      attributes: new FormGroup({
        description: new FormControl('', [Validators.required]),
        is_active: new FormControl(false, [Validators.required]),
        id_partner: new FormControl(this.userSesion.user.id_partner),
      })
    })
  });

  get attributes_is_active(): any {
    return this.donationTypeForm.get('data.attributes.is_active');
  }

  get attributes_id_partner(): any {
    return this.donationTypeForm.get('data.attributes.id_partner');
  }

  get data_id(): any {
    return this.donationTypeForm.get('data.id');
  }

  constructor(private _notify: NotificationsService) {
    
   }

  ngOnInit(): void {
 
  }


  submit() {
    if (this.donationTypeForm.valid) {  
      this.btnSiguiente.emit(this.donationTypeForm.value);
    }
    else {
      this._notify.warn('Advertencia', 'Formulario invalido.')
    }
  }

  regresar() {
    this.btnRegresar.emit("regresar");
  }

}
