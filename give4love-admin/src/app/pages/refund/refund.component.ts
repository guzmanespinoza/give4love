import { ResponseModelById } from './../../models/response-model';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-refund',
  templateUrl: './refund.component.html',
  styleUrls: ['./refund.component.scss']
})
export class RefundComponent implements OnInit {

  filterQuery: string;

  getRefundByPartnerData:ResponseModelById={data:[], links:null, meta:null};

  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.getRefundByPartner();
    this.statics();
  }

  getRefundByPartner(){
    let usuerId=JSON.parse(sessionStorage.getItem('g4l-user')).user.id_partner;
    // debugger;
    this.api.getRefundByPartner(usuerId).subscribe(
      (response)=>{
        this.getRefundByPartnerData=response;
      },
      (error)=>{

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

}
