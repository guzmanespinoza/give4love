import { NotificationsService } from 'angular2-notifications';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ResponseModelById } from 'src/app/models/response-model';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  filterQuery: string;

  getDonationByPartnerData: ResponseModelById = { data: [], links: null, meta: null };

  constructor(private api: ApiService, private _notify: NotificationsService) { }

  ngOnInit(): void {
    this.getDonationByPartner();
    this.statics();
  }

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
      type: new FormControl('refund'),
      attributes: new FormGroup({
        reason: new FormControl('', [Validators.required]),
        id_donation: new FormControl(''),
      })
    })
  });

  getDonationByPartner() {
    let usuerId = JSON.parse(sessionStorage.getItem('g4l-user')).user.id_partner;
    // debugger;
    this.api.getDonationByPartner(usuerId).subscribe(
      (response) => {
        this.getDonationByPartnerData = response;
      },
      (error) => {

      }
    )
  }

 staticsData:ResponseModelById={data:null, links:null, meta:null};


 statics(){
  let usuerId = JSON.parse(sessionStorage.getItem('g4l-user')).user.id_partner;
  // debugger;
  this.api.statics(usuerId).subscribe(
    (response) => {
      this.staticsData = response;
    },
    (error) => {

    }
  )
 }

  submit() {
    if (this.donationTypeForm.valid) {
      let form = this.donationTypeForm.value;
      form.data.attributes.id_donation = this.reembolso.detail.id;

      this.api.refundPost(form).subscribe(
        (response)=>{
          $('#modalReembolar').modal('hide');
          this.getDonationByPartner();
          this._notify.success('Exito', 'Reembolso generado.');
        },
        (error)=>{
          this._notify.warn('Advertencia', 'Reembolso no generado..');
        }
      )

     
    } else {
      this._notify.warn('Advertencia', 'Formulario invalido.');
    }

  }

  regresar() {
    $('.dropdown').dropdown('hide');
    $('#modalReembolar').modal('hide');
    this.donationTypeForm.reset();
  }

  reembolso = { detail: null, form: { id_donation: null, reason: '' } };
  reembolsar(d) {
    this.reembolso.detail = d;
    console.log(this.reembolso.detail);
    $('#modalReembolar').modal('show');
  }

  dropdown(id, state) {
    $('.dropdown').dropdown('hide');
    $('#' + id).dropdown(state);
  }
}
