import { Countrie } from './../../data/countries';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationsService } from 'angular2-notifications';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiClientService } from 'src/app/services/api-client.service';
import { ApiUsersService } from 'src/app/services/api-users.service';
declare var $: any;

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {

  countrie:Countrie;

  paises:any[]=[];

  view = 'pay';
  tab = "donante"; // direccion - donante - completo
  terminos = false;
  options = {
    position: ['bottom', 'right'],
    timeOut: 5000,
    lastOnBottom: true,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true,
  };

  imgLoaded: any = "data:image/png;base64,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";

  personForm: FormGroup = new FormGroup({
    // image: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    cell_phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    password2: new FormControl('', [Validators.required])
  });

  addressForm: FormGroup = new FormGroup({
    text: new FormControl('', [Validators.required]),
    postal_code: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    street_line: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
  });


  submitted = false;
  submitted2 = false;

  idPartner: string = "";
  idTypeDonation: string = "";
  amount: string = "";
  _id=null;

  generarPago = {
    data: {
      type: "donation",
      attributes: {
        amount: "",
        id_partner: "",
        id_client: "",
        id_reason: ""
      }
    }
  }

  constructor(private spinner: NgxSpinnerService, private route: ActivatedRoute, private router: Router, private apiClient: ApiClientService, private apiUser: ApiUsersService, private notify: NotificationsService) {
    this.idPartner = this.route.snapshot.params.idPartner;
    this.idTypeDonation = this.route.snapshot.params.idTypeDonation;
    this.amount = this.route.snapshot.params.amount;
    this._id=JSON.parse(atob(localStorage.getItem(btoa('donante-user'))))._id;
  }

  ngOnInit(): void {
    this.countrie =new Countrie();
    this.paises=this.countrie.getCoutries;
  }

  get f() {
    return this.personForm.controls;
  }

  get f2() {
    return this.addressForm.controls;
  }

  registrarme() {
    this.generarPago.data.attributes.id_partner = this.idPartner;
    this.generarPago.data.attributes.id_client = this._id;

    let donaciones = JSON.parse(localStorage.getItem('Donacion'));

    for(let d of donaciones){
      this.generarPago.data.attributes.id_reason = d.tipo.id;
      this.generarPago.data.attributes.amount = d.monto;
  
      this.apiUser.pay(this.generarPago).subscribe(
        (response) => {
          this.tab = 'completo';  
        },
        err=>{
          this.notify.warn('¡Advertencia!', 'El pago no procesado.');
        }
      )
    }

    

   
  }

  registrarAddress() {
    this.submitted2 = true;
    console.log(this.addressForm.value);
    if (this.addressForm.valid) {
      if (this.terminos == true) {
        this.spinner.show();

        let data = {
          image: this.imgLoaded,
          ...this.personForm.value,
          address: this.addressForm.value
        };

        this.apiClient.create(data).subscribe(
          response => {
            this.spinner.hide();
            this.tab = 'completo';
            setTimeout(() => {
              this.router.navigate(['sign-up-confirm']);

            }, 10000);
          },
          error => {
            this.spinner.hide();
            this.notify.warn('¡Advertencia!', 'La cuenta no pudo ser creada.');
          });
      }
    }
  }

  cargarImagen(event) {
    for (let d of event.target.files) {
      let file = d;
      console.log(file.name);
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imgLoaded = reader.result.toString();
        console.log(this.imgLoaded);
      };
    }
  }

  validadorPasword(): boolean[] {
    let respuesta: boolean[] = [false, false, false];
    var texto = this.personForm.value.password;
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

  onSaveUsernameChanged(value: boolean) {
    this.terminos = value;
  }


  regresar() {
    this.router.navigate(['login']);
  }

  irAMiHistorial() {
    //amount-donation/:idPartner
    this.router.navigate([`my-profile`]);
  }

  realizarOtra() {
    this.router.navigate([`amount-donation/${this.idPartner}`]);
  }

}
