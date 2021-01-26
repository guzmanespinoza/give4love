import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input('view') view: string;
  @Input() options: boolean;

  user: any;
  now = Date.now();

  verNav=true;

  constructor() {
    $('#msb').hide();

  }

  ngOnInit(): void {

    this.menuClose();
   
    if (this.view != 'noLogin') {
      if(localStorage.getItem(btoa('donante-user'))){
        this.user = JSON.parse(atob(localStorage.getItem(btoa('donante-user'))));
      }
      
     
    }
    
    console.log('usuario', this.user);

    if (this.user == null) {
      this.verNav=false;
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

  cerrarSesion() {
    localStorage.clear();
    sessionStorage.clear();
  }





}
