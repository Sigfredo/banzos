import { Component, Input, OnInit } from "@angular/core";
import * as moment from 'moment';
import { EditarComponent } from "../editar/editar.component";
import { Aluno } from "../aluno";
import { AlunosMensagemService } from "../alunos-mensagem.service";
import { BanzosUtils } from "../../../shared/banzos-util";
import { Timestamp } from "rxjs/internal/operators/timestamp";

@Component({
  selector: 'banzos-aluno-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.scss']
})
export class ListagemComponent implements OnInit {

  ngOnInit(): void {

  }

  constructor(
    private banzosUtils: BanzosUtils
  ){}
  
  @Input()
  alunos = [];

  arrayAlunoSort = [];

 
  buscarIdade(nascimento: Timestamp<any>){
     return moment(new Date(nascimento['seconds'])).locale('pt-br').fromNow(true);
  }

  ordenarAlunos(coluna){
    if(typeof this.arrayAlunoSort[coluna]==='undefined'){
      this.arrayAlunoSort = [];
    }
    this.alunos = this.banzosUtils.filter(this.alunos,coluna,this.arrayAlunoSort[coluna]==1?true:false)
    if (this.arrayAlunoSort[coluna] == 1){
      this.arrayAlunoSort[coluna] = 0
    } else {
      this.arrayAlunoSort[coluna] = 1
    }
  }

}
