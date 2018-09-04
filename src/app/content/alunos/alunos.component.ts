import { Component, OnInit } from '@angular/core';
import { AlunosService } from './alunos.service';


@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.scss']
})
export class AlunosComponent implements OnInit {

 alunos = [];


  
  constructor(private alunosService: AlunosService) { }

  ngOnInit() {
    this.alunosService.todosAlunos()
    .subscribe(
       (response) => {this.alunos = response},
      // (response) => {console.log(response)},
      (error) => {console.log(error)}
    );
  }

}
