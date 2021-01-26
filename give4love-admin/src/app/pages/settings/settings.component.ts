import { ResponseModel } from './../../models/response-model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/services/api.service';
declare var $: any;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  options = {
    position: ['bottom', 'right'],
    timeOut: 5000,
    lastOnBottom: true,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true,
  };
  option='add'; //add edit
  dataType:any;

  userSesion = JSON.parse(sessionStorage.getItem('g4l-user'));

  tiposDeDonaciones:ResponseModel={data:[], links:null, meta:null}

  constructor(private api: ApiService, private _notify: NotificationsService, private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit() {
  this.get();
  }

  get(){
    this.api.getDonationTypes(this.userSesion.user.id_partner).subscribe(
      (response)=>{
        console.warn(response);
        this.tiposDeDonaciones=response;
      }
    )
  }

  abrirAgregar() {
    this.option='add';
    $('#modalAgregar').modal('show');
  }

  agregar(output) {
    this.spinner.show();
    delete output.data.id;
    this.api.donationTypesPost(output).subscribe(
      (respose) => {
        this.spinner.hide();
        $('#modalAgregar').modal('hide');
        this.get();
        this._notify.success('Exito', 'Registro agregado');
      },
      (error) => {
        this.spinner.hide();
        this._notify.warn('Advertencia', 'Registro no pudo ser agregado');
      }
    )
  }
  demo;
  moverEstado(data){
    delete data.attributes.created_at;
    delete data.attributes.__v;
    delete data.attributes.updated_at;
    delete data.links;
   data.type='donation-types';
    if(data.attributes.is_active){
      data.attributes.is_active=false;
    }
    else{
      data.attributes.is_active=true;
    }
    data={data:data};
    
    this.api.donationTypesPatch(data).subscribe(
      (respose) => {
        this.spinner.hide();
        $('#modalAgregar').modal('hide');
        
        this.get();
        this._notify.success('Exito', 'Registro modificado');
      },
      (error) => {
        this.spinner.hide();
        this._notify.warn('Advertencia', 'Registro no pudo ser modificado');
      }
    )
    // this.demo=data;
  }

  modificar(data){
   //data.type='donation-types';
    
    this.api.donationTypesPatch(data).subscribe(
      (respose) => {
        this.spinner.hide();
        $('#modalAgregar').modal('hide');
        
        this.get();
        this._notify.success('Exito', 'Registro modificado');
      },
      (error) => {
        this.spinner.hide();
        this._notify.warn('Advertencia', 'Registro no pudo ser modificado');
      }
    )
    // this.demo=data;
  }

  selectRow(d){
    console.log(d);
    this.dataType=d;
    this.option='edit';
    $('#modalAgregar').modal('show');
  }

  cancelar(d){
    this.dataType=null;
    this.option='add';
    $('#modalAgregar').modal('hide');
  }

}
