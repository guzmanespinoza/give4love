import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApiPartnerService } from 'src/app/services/api-partner.service';
import { ResponseModel } from 'src/app/models/response-model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiAuthService } from 'src/app/services/api-auth.service';

declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  offset = 0;
  limit = 20;
  visible = false;

  idSeleccionado='';

  options = {
    position: ['bottom', 'right'],
    timeOut: 5000,
    lastOnBottom: true,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true,
  };

  filterQuery='';
  partners: ResponseModel = { data: [], links: null, meta: null };

  constructor(private apiLogin: ApiAuthService, private router: Router, private apiPartner: ApiPartnerService, private notify: NotificationsService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getAllPartners(this.offset, this.limit);

  }


  goHome() {
    this.router.navigateByUrl('login');
  }

  getAllPartners(offset, limit) {
    let o;
    if (offset == 0) {
      o = offset;
    }
    else {
      o = offset + 1
    }

    this.apiPartner.getAll(o, limit).subscribe(
      (response) => {
        this.partners.data = this.partners.data.concat(response.data);
        this.offset = offset;
        this.limit = limit;
      },
      (error) => {

      }
    );
  }

  goToDonar(p) {
    this.idSeleccionado=p.id;
    let sesion = sessionStorage.getItem(btoa('donante-jwt'));
    console.log(sesion);
    //CAMBIO EN CASO QUE PRINCIPAL SIEMMPRE MUESTRA LA ORDEN DE COMPRA
    this.router.navigateByUrl(`amount-donation/${p.id}`);

    // if (sesion != null) {
    //   this.router.navigateByUrl(`amount-donation/${p.id}`);
    // }
    // else {
    //     $('#modal_login').modal('show');
    // }
  }

  login(data) {
    this.spinner.show();
    this.apiLogin.login(data).subscribe(response => {
      console.log(response);
      sessionStorage.setItem(btoa('donante-jwt'), btoa(response.token));
      localStorage.setItem(btoa('donante-user'), btoa(JSON.stringify(response.user)));
     
      setTimeout(() => {
        $(".modal").modal("hide");
        this.spinner.hide();
        this.router.navigateByUrl(`amount-donation/${this.idSeleccionado}`);
      }, 2000);

    }, error => {
      console.log(error);
      this.spinner.hide();
      this.notify.warn('¡Advertencia!', 'Credenciales incorrectas.');
    });
  }

  signUpMeth(){
    console.log("events")
    $(".modal").modal("hide");
    this.router.navigateByUrl(`sign-up/${this.idSeleccionado}`);
  }

}
