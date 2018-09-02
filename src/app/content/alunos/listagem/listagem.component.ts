import { Component, Input } from "@angular/core";

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

}
