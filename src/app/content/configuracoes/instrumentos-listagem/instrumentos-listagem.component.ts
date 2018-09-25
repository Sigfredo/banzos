import { Component, Input, OnInit } from "@angular/core";
import * as moment from 'moment';
import { DisciplinasEdicaoComponent } from "../disciplinas-edicao/disciplinas-edicao.component"
import { Disciplina } from "../disciplina";
import { DisciplinasMensagemService } from "../disciplinas-mensagem.service";

@Component({
  selector: 'banzos-disciplinas-listagem',
  templateUrl: './disciplinas-listagem.component.html',
  styleUrls: ['./disciplinas-listagem.component.scss']
})
export class DisciplinasListagemComponent {
  
  @Input()
  disciplinas = [];

  disciplinaTeste: Disciplina;

  buscarIdade(nascimento: Date){
    
    return moment(new Date(nascimento)).locale('pt-br').fromNow(true);
  }
}
