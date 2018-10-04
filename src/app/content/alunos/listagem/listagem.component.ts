import { Component, Input, OnInit } from "@angular/core";
import * as moment from 'moment';
import { EditarComponent } from "../editar/editar.component";
import { Aluno } from "../aluno";
import { AlunosMensagemService } from "../alunos-mensagem.service";
import { BanzosUtils } from "../../../shared/banzos-util";

@Component({
  selector: 'banzos-aluno-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.scss']
})
export class ListagemComponent implements OnInit {

  ngOnInit(): void {
     this.arrayAlunoSort['nome'] = 2;
  }

  constructor(
    private banzosUtils: BanzosUtils
  ){}
  
  @Input()
  alunos = [];

  arrayAlunoSort = [];

 
  buscarIdade(nascimento: Date){
    
    return moment(new Date(nascimento)).locale('pt-br').fromNow(true);
  }

  ordenarAlunos(coluna){
    this.alunos = this.banzosUtils.filter(this.alunos,coluna,this.arrayAlunoSort['nome']==1?true:false)
    if (this.arrayAlunoSort['nome'] == 1){
      this.arrayAlunoSort['nome'] = 0
    } else {
      this.arrayAlunoSort['nome'] = 1
    }
  }

}
