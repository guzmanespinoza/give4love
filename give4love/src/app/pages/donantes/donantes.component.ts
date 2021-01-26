import { ApiClientService } from 'src/app/services/api-client.service';
import { ResponseModel } from './../../models/response-model';
import { ApiUsersService } from 'src/app/services/api-users.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';

declare var $:any;

@Component({
  selector: 'app-donantes',
  templateUrl: './donantes.component.html',
  styleUrls: ['./donantes.component.scss']
})
export class DonantesComponent implements OnInit {

  user:any;
  getALlDonationsData : ResponseModel ={data:[], links:null, meta:null};

  donationTypeForm: FormGroup = new FormGroup({
    data: new FormGroup({
      type: new FormControl('refund'),
      id: new FormControl(''),
      attributes: new FormGroup({
        reason: new FormControl('', [Validators.required]),
        id_donation: new FormControl(false, [Validators.required]),
      })
    })
  });

  options = {
    position: ['bottom', 'right'],
    timeOut: 5000,
    lastOnBottom: true,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true,
  };

  constructor(private _notify: NotificationsService, private router:Router, private apiUser:ApiUsersService, private apiClient:ApiClientService) { }

  ngOnInit(): void {
    this.user=JSON.parse(atob(localStorage.getItem(btoa('donante-user'))));
    // this.user.image='assets/images/person.jpg'
    this.getALlDonations();
  }

  irADonar(){
    this.router.navigate(['/home']);
  }

  totalDonado=0;

  getALlDonations(){
    this.apiUser.getDonations(this.user._id).subscribe(response=>{
      this.getALlDonationsData=response;
      this.totalDonado = response.data.reduce((sum, value) => (typeof value.attributes.amount == "number" ? sum + value.attributes.amount : sum), 0);
    })
  }

  showModalRefund(data){
    console.log(data);
    $('#modalAgregar').modal('show');
    this.donationTypeForm.get('data.attributes.reason').setValue('');
    this.donationTypeForm.get('data.attributes.id_donation').setValue(data.id);
  }

  regresarRegund(){
    $('#modalAgregar').modal('hide');
  }

  submitRefund(){
    if(this.donationTypeForm.valid){
      let data =this.donationTypeForm.value;
      delete data.data.id;
      this.apiClient.refund(data).subscribe(respose=>{
        this._notify.success('Reembolso', 'Reembolso solicitado');
      }, error=>{
        this._notify.error('Ups', 'Reembolso no pudo ser solicitado, intente más tarde.');
      });
    }
     
  }

  

  

}
