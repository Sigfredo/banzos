import { Component, Input } from "@angular/core";
import * as moment from 'moment';
import { EditarComponent } from "../editar/editar.component";
import { Aluno } from "../aluno";

@Component({
  selector: 'banzos-aluno-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.scss']
})
export class ListagemComponent {

  constructor(
    private alunoEditar: EditarComponent
  ){

  }
  
  @Input()
  alunos = [];

  alunoTeste: Aluno;

  buscarIdade(nascimento: Date){
    
    return moment(new Date(nascimento)).locale('pt-br').fromNow(true);
  }

  // adicionarAluno(id: number){
  //   this.alunoEditar.editarAluno(id);    
  // }
}
