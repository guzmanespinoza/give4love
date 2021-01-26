import { Component, OnInit, Input } from '@angular/core';
import { ResponseModel, ResponseModelById } from 'src/app/models/response-model';

@Component({
  selector: 'app-donacion-header',
  templateUrl: './donacion-header.component.html',
  styleUrls: ['./donacion-header.component.scss']
})
export class DonacionHeaderComponent implements OnInit {

  @Input() partner:ResponseModelById;


  constructor() { }

  ngOnInit(): void {
  }

}
