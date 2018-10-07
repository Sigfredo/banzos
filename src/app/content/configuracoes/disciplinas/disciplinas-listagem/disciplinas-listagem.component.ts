import { Component, Input } from "@angular/core";
import { BanzosUtils } from "../../../../shared/banzos-util";

@Component({
  selector: 'banzos-disciplinas-listagem',
  templateUrl: './disciplinas-listagem.component.html',
  styleUrls: ['./disciplinas-listagem.component.scss']
})
export class DisciplinasListagemComponent {
  
  @Input()
  disciplinas = [];
  
  arrayDisciplinaSort = [];

  constructor(
    private banzosUtils: BanzosUtils
  ){}

  ordenarDisciplinas(coluna){
    this.disciplinas = this.banzosUtils.filter(this.disciplinas,coluna,this.arrayDisciplinaSort[coluna]==1?true:false)
    if (this.arrayDisciplinaSort[coluna] == 1){
      this.arrayDisciplinaSort[coluna] = 0
    } else {
      this.arrayDisciplinaSort[coluna] = 1
    }
  }
}
