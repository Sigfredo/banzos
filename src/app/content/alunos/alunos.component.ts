import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import { Observable } from "rxjs";

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.scss']
})
export class AlunosComponent implements OnInit {

  alunos$: Object;
  
  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getAlunos().subscribe(
      data => this.alunos$ = data 
    );
  }

}
