import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NotificationsService } from 'angular2-notifications';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  tab='partner';

  options = {
    position: ['bottom', 'right'],
    timeOut: 5000,
    lastOnBottom: true,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true,
  };

  dataCrearPartner: any;
  dataCrearUsuario: any;

  constructor(private api: ApiService, private _notify: NotificationsService, private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit(): void {
  }

  btnSiguiente(data) {
    console.log(data);
  }

  obtenerDataDePartner(output: any) {
    let address = [output.data.attributes.address];
    delete output.data.attributes.address;
    delete output.data.id;
    output.data.attributes = { address: address, ...output.data.attributes };

    output.data.attributes.phone = (output.data.attributes.phone).toString();
    output.data.attributes.cell_phone = (output.data.attributes.cell_phone).toString();

    this.dataCrearPartner = output;
    console.log(output);
    this.tab='user';
  }

  obtenerDataDeUsuario(output: any) {
    let permissions = [output.data.attributes.permissions];
    delete output.data.attributes.permissions;
    delete output.data.attributes.password2;
    delete output.data.id;

    output.data.attributes.phone = (output.data.attributes.phone).toString();
    output.data.attributes.cell_phone = (output.data.attributes.cell_phone).toString();
    console.log(output.data.attributes.phone);

    output.data.attributes = { permissions: permissions, ...output.data.attributes };
    this.dataCrearUsuario = output;
    console.log(output);
    this.create();
  }

  create() {
    this.spinner.show();
    this.api.partnersPost(this.dataCrearPartner).subscribe(response => {
      this.dataCrearUsuario.data.attributes.id_partner = response.data.id;
      this.api.usersPost(this.dataCrearUsuario).subscribe(response => {
        console.log('response', response);
        this.tab='completo';
        this.spinner.hide();
        setTimeout(() => {
          this.router.navigate(['sign-up-confirm']);
  
        }, 10000);
      },
      (error)=>{
        this._notify.warn('Advertencia', 'Problemas al registrar usuario');
      })
    }, 
    (error)=>{
      this.spinner.hide();
      this._notify.warn('Advertencia', 'Problemas al registrar organización');
    }
    );

  }

  cancelar(){
    this.router.navigateByUrl('/login');
  }

}
