import { Component, Input, OnInit } from "@angular/core";
import * as moment from 'moment';
import { EditarComponent } from "../editar/editar.component";
import { Aluno } from "../aluno";
import { AlunosMensagemService } from "../alunos-mensagem.service";

@Component({
  selector: 'banzos-aluno-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.scss']
})
export class ListagemComponent {
  
  @Input()
  alunos = [];

  alunoTeste: Aluno;

  buscarIdade(nascimento: Date){
    
    return moment(new Date(nascimento)).locale('pt-br').fromNow(true);
  }
}
