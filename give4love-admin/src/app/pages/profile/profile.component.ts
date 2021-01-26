import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
import { ResponseModelById } from 'src/app/models/response-model';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  demo: any;
  tab = 'user';//user acerca

  userSesion = JSON.parse(sessionStorage.getItem('g4l-user'));
  dataUserEdit: ResponseModelById;
  dataPartnerEdit: ResponseModelById;

  options = {
    position: ['bottom', 'right'],
    timeOut: 5000,
    lastOnBottom: true,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true,
  };


  constructor(private api: ApiService, private _notify: NotificationsService, private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit(): void {
    this.getUserById();
    this.getPartnerById();
  }

  getUserById() {
    this.api.getUserById(this.userSesion.user._id).subscribe(
      (response) => {
        this.dataUserEdit = response;
      },
      (error) => {

      }
    )
  }

  getPartnerById() {
    this.api.getPartnerById(this.userSesion.user.id_partner).subscribe(
      (response) => {
        this.dataPartnerEdit = response;

        console.log('oartner', response);
      },
      (error) => {
        this._notify.warn('Advertencia', 'Registro no pudo ser modificado');
      }
    )
  }


  actualizarUsuario(output) {
    this.spinner.show();
    let permissions = [output.data.attributes.permissions];
    delete output.data.attributes.permissions;
    delete output.data.attributes.password2;
    output.data.attributes = { permissions: permissions, ...output.data.attributes };
    console.log(output);
    this.api.usersPatch(output).subscribe(
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

  actualizarPartner(output: any) {
    let address = [output.data.attributes.address];
    delete output.data.attributes.address;
    output.data.attributes = { address: address, ...output.data.attributes };
    this.demo = output;
    this.api.partnersPatch(output).subscribe(
      (respose) => {
        this.getPartnerById();
        this.spinner.hide();
        this._notify.success('Exito', 'Registro actualizado');
      },
      (error) => {
        this.spinner.hide();
      }
    )
  }

  regresar(output) {
    this.router.navigate(['home']);
  }

}
