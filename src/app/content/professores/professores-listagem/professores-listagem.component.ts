import { Component, Input, OnInit } from "@angular/core";
import * as moment from 'moment';
import { BanzosUtils } from "../../../shared/banzos-util";

@Component({
  selector: 'banzos-professores-listagem',
  templateUrl: './professores-listagem.component.html',
  styleUrls: ['./professores-listagem.component.scss']
})
export class ProfessoresListagemComponent {
  
  @Input()
  professores = [];

  arrayProfessorSort = [];

  constructor(
    private banzosUtils: BanzosUtils
  ){}

  buscarIdade(nascimento: Date){
    
    return moment(new Date(nascimento)).locale('pt-br').fromNow(true);
  }

  ordenarProfessores(coluna){
    this.professores = this.banzosUtils.filter(this.professores,coluna,this.arrayProfessorSort[coluna]==1?true:false)
    if (this.arrayProfessorSort[coluna] == 1){
      this.arrayProfessorSort[coluna] = 0
    } else {
      this.arrayProfessorSort[coluna] = 1
    }
  }

}
