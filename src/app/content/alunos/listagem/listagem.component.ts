import { Component, Input } from "@angular/core";
import * as moment from 'moment';

@Component({
  selector: 'banzos-aluno-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.scss']
})
export class ListagemComponent {

  constructor(){

  }
  
  @Input()
  alunos = [];

  buscarIdade(nascimento: string){

    return moment(nascimento, "DD/MM/YYYY").fromNow(true);
  }

}
