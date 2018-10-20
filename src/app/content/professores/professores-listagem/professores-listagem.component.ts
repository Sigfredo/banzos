import { Component, Input, OnInit } from "@angular/core";
import * as moment from 'moment';
import { BanzosUtils } from "../../../shared/banzos-util";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { Instrumento } from "../../configuracoes/instrumentos/instrumento";
import { InstrumentoId } from "../../configuracoes/instrumentos/instrumentoId";
import { Professor } from "../professor";
import { ProfessorId } from "../professorId";

@Component({
  selector: 'banzos-professores-listagem',
  templateUrl: './professores-listagem.component.html',
  styleUrls: ['./professores-listagem.component.scss']
})
export class ProfessoresListagemComponent{
  
  private professorCollection: AngularFirestoreCollection<Professor>;
  private professores: ProfessorId[] = [];

  @Input()
  instrumentos = [];

  arrayProfessorSort = [];

  constructor(
    private banzosUtils: BanzosUtils,
    private readonly afs: AngularFirestore
  ){
    this.professorCollection = afs.collection<Professor>('professor');
    // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // a lot of information about "what happened" with each change. If you want to
    // get the data and the id use the map operator.
    this.professorCollection.snapshotChanges().subscribe(
      actions => actions.map(a => {
        const data = a.payload.doc.data() as ProfessorId;
        data.id = a.payload.doc.id;
        this.professores.push(data);
      })
    );
   

  }

  ordenarProfessores(coluna){
    console.log(this.instrumentos)
    this.professores = this.banzosUtils.filter(this.professores,coluna,this.arrayProfessorSort[coluna]==1?true:false)
    if (this.arrayProfessorSort[coluna] == 1){
      this.arrayProfessorSort[coluna] = 0
    } else {
      this.arrayProfessorSort[coluna] = 1
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
