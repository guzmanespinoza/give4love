import { ResponseModelById } from './../../models/response-model';
import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userSesion = JSON.parse(sessionStorage.getItem('g4l-user'));
  userPartner: ResponseModelById;

  @Input() options: boolean;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.menuClose();
    if (this.userSesion) {
      this.getPartnerById();
    }
  }

  ngAfterViewInit(): void {

    $('#msb').hide();

    $('#msboc').on('click', function () {
      $('#msb').hide(300);
    });
    $('.acx').on('click', function () {
      $('#msb').hide(300);
    });

  }

  menuOpen() {
    $('#msb').show(300);
  }

  menuClose() {
    $('#msb').hide(300);
  }

  getPartnerById() {
    this.api.getPartnerById(this.userSesion.user.id_partner).subscribe(
      (response) => {
        this.userPartner = response;
      },
      (error) => {

      }
    )
  }



}
