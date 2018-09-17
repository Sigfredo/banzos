import { Component, Input, OnInit } from "@angular/core";
import * as moment from 'moment';
import { ProfessoresEdicaoComponent } from "../professores-edicao/professores-edicao.component"
import { Professor } from "../professor";
import { ProfessoresMensagemService } from "../professores-mensagem.service";

@Component({
  selector: 'banzos-professores-listagem',
  templateUrl: './professores-listagem.component.html',
  styleUrls: ['./professores-listagem.component.scss']
})
export class ProfessoresListagemComponent {
  
  @Input()
  professores = [];

  professorTeste: Professor;

  buscarIdade(nascimento: Date){
    
    return moment(new Date(nascimento)).locale('pt-br').fromNow(true);
  }
}
