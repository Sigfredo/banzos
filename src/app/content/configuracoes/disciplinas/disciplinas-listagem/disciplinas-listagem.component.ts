import { Component, Input } from "@angular/core";
import { BanzosUtils } from "../../../../shared/banzos-util";
import { Disciplina } from "../disciplina";
import { DisciplinaId } from "../disciplinaId";
import { AngularFirestoreCollection, AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: 'banzos-disciplinas-listagem',
  templateUrl: './disciplinas-listagem.component.html',
  styleUrls: ['./disciplinas-listagem.component.scss']
})
export class DisciplinasListagemComponent {
  
  private disciplinaCollection: AngularFirestoreCollection<Disciplina>;
  private disciplinas: DisciplinaId[] = [];

  constructor(
    private banzosUtils: BanzosUtils,
    private readonly afs: AngularFirestore
  ){
    this.disciplinaCollection = afs.collection<Disciplina>('disciplina');
    // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // a lot of information about "what happened" with each change. If you want to
    // get the data and the id use the map operator.
    this.disciplinaCollection.snapshotChanges().subscribe(
      actions => actions.map(a => {
        const data = a.payload.doc.data() as DisciplinaId;
        data.id = a.payload.doc.id;
        this.disciplinas.push(data);
      })
    );
   

  }

  @Input()
  instrumentos = [];
  
  arrayDisciplinaSort = [];

  ordenarDisciplinas(coluna){
    this.disciplinas = this.banzosUtils.filter(this.disciplinas,coluna,this.arrayDisciplinaSort[coluna]==1?true:false)
    if (this.arrayDisciplinaSort[coluna] == 1){
      this.arrayDisciplinaSort[coluna] = 0
    } else {
      this.arrayDisciplinaSort[coluna] = 1
    }
  }

  nomeInstrumento(id){
    
    if (this.instrumentos.find(o => o.id === id) != undefined){
      return this.instrumentos.find(o => o.id === id).nome
    } else {
      return 'Erro';
    }
  }
  
}
