import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { ResponseModel, ResponseModelById } from 'src/app/models/response-model';
import { ApiAuthService } from 'src/app/services/api-auth.service';
import { ApiPartnerService } from 'src/app/services/api-partner.service';

declare var $: any;

@Component({
  selector: 'app-donacion',
  templateUrl: './donacion.component.html',
  styleUrls: ['./donacion.component.scss']
})
export class DonacionComponent implements OnInit {

  idPartner: string = "";
  idTypeDonation: string = "";
  typeDonation: any = {};
  partner: ResponseModelById = { data: {}, links: null, meta: null };
  monto: number = 0.00;
  idSeleccionado = '';

  donationTypes: ResponseModel = { data: [], links: null, meta: null }

  pantalla = 'valor'; // valor , para               

  constructor(private apiLogin: ApiAuthService, private router: Router, private route: ActivatedRoute, private apiPartner: ApiPartnerService, private notify: NotificationsService, private spinner: NgxSpinnerService) {
    this.idPartner = this.route.snapshot.params.idPartner;
  }

  ngOnInit(): void {
    this.getPartnerById();

  }

  getPartnerById() {
    this.apiPartner.getById(this.idPartner).subscribe(
      (response) => {
        this.partner = response;
      },
      (error) => {

      }
    );
  }

  regresar() {
    this.router.navigate(['/my-profile']);
  }

  irAPara() {
    if (this.monto > 0) {
      this.pantalla = 'para';
      this.apiPartner.getDonationTypes(this.idPartner).subscribe(
        (response) => {
          this.donationTypes = response;
        },
        (error) => {

        }
      );
    }
  }

  donacionesSeleccionadas: any[] = [];
  totalConfirm = 0;
  confirmacion() {
    if (this.idTypeDonation != '') {
      this.donacionesSeleccionadas.push({ monto: this.monto, tipo: this.typeDonation });
      this.totalConfirm=0;
      for (let d of this.donacionesSeleccionadas) {
        this.totalConfirm = this.totalConfirm + d.monto;
      }
      this.pantalla = 'confirm';
      
    }
    this.idTypeDonation='';
  }

  quitarDonacion(d){
    let position = this.donacionesSeleccionadas.indexOf(d);
    if (position !== -1) {
      this.donacionesSeleccionadas.splice(position, 1);
    }
  }

  continuar() {
  
      this.idSeleccionado = this.idPartner;
      let sesion = sessionStorage.getItem(btoa('donante-jwt'));
      localStorage.setItem("Donacion", JSON.stringify(this.donacionesSeleccionadas));
      if (sesion != null) {
        console.log(`pay/${this.idPartner}`);
        this.router.navigateByUrl(`pay/${this.idPartner}`);
      }
      else {
        $('#modal_login').modal('show');
      }


    
  }

  setiarId(typeDonation) {
    this.idTypeDonation = typeDonation.id;
    this.typeDonation = typeDonation;
    console.log(typeDonation);
  }

  signUpMeth() {
    console.log("events")
    $(".modal").modal("hide");
    this.router.navigateByUrl(`sign-up/${this.idSeleccionado}`);
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
        console.log(`pay/${this.idPartner}`);
        this.router.navigateByUrl(`pay/${this.idPartner}`);
      }, 2000);

    }, error => {
      console.log(error);
      this.spinner.hide();
      this.notify.warn('¡Advertencia!', 'Credenciales incorrectas.');
    });
  }


}
