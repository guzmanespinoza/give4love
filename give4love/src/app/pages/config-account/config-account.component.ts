import { ResponseModelById } from './../../models/response-model';
import { Component, OnInit } from '@angular/core';
import { ApiUsersService } from 'src/app/services/api-users.service';
import { NotificationsService } from 'angular2-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ApiClientService } from 'src/app/services/api-client.service';

@Component({
  selector: 'app-config-account',
  templateUrl: './config-account.component.html',
  styleUrls: ['./config-account.component.scss']
})
export class ConfigAccountComponent implements OnInit {

  demo: any;
  tab = 'user';//user acerca
  imagenInicial='';
  userSesion = JSON.parse(atob(localStorage.getItem(btoa('donante-user'))));
  dataUserEdit: ResponseModelById={data:[], links:null, meta:null};
  dataPartnerEdit: ResponseModelById;

  options = {
    position: ['bottom', 'right'],
    timeOut: 5000,
    lastOnBottom: true,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true,
  };


  constructor(private apiClient:ApiClientService, private api: ApiUsersService, private _notify: NotificationsService, private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit(): void {
    this.getUserById();
    // this.getPartnerById();
  }

  getUserById() {

    this.apiClient.getById('/'+this.userSesion._id).subscribe(
      (response) => {
        this.dataUserEdit = response;
        this.imagenInicial = response?.data.attributes.image;
      },
      (error) => {

      }
    )
  }

  // getPartnerById() {
  //   this.api.getPartnerById(this.userSesion.user.id_partner).subscribe(
  //     (response) => {
  //       this.dataPartnerEdit = response;

  //       console.log('oartner', response);
  //     },
  //     (error) => {
  //       this._notify.warn('Advertencia', 'Registro no pudo ser modificado');
  //     }
  //   )
  // }


  actualizarUsuario(output) {
    this.spinner.show();
    delete output.data.attributes.permissions;
    delete output.data.attributes.password2;

    if( output.data.attributes.image== this.imagenInicial){
      delete output.data.attributes.image;
    }

    console.log(output);
    let data={data:output.data.attributes};
    console.log(data);
    this.apiClient.clientsPatch(output).subscribe(
      (respose) => {
        this.getUserById();
        this.spinner.hide();
        this._notify.success('Exito', 'Usuario actualizado');
      },
      (error) => {
        this.spinner.hide();
        this._notify.warn('Advertencia', 'Registro no pudo ser modificado');
      }
    )
  }

  // actualizarPartner(output: any) {
  //   let address = [output.data.attributes.address];
  //   delete output.data.attributes.address;
  //   output.data.attributes = { address: address, ...output.data.attributes };
  //   this.demo = output;
  //   this.api.partnersPatch(output).subscribe(
  //     (respose) => {
  //       this.getPartnerById();
  //       this.spinner.hide();
  //       this._notify.success('Exito', 'Registro actualizado');
  //     },
  //     (error) => {
  //       this.spinner.hide();
  //     }
  //   )
  // }

  regresar(output) {
    this.router.navigate(['my-profile']);
  }


}
