import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import { Observable } from "rxjs";

@Component({
  selector: 'app-financeiro',
  templateUrl: './financeiro.component.html',
  styleUrls: ['./financeiro.component.scss']
})
export class FinanceiroComponent implements OnInit {

  pagamentos$: Object;

  constructor(private data: DataService) {

   }

  ngOnInit() {
    this.data.getPagamentos().subscribe(
      data => this.pagamentos$ = data
    );
  }

}
