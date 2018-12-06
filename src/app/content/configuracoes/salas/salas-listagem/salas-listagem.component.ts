import { Component, Input, OnInit } from "@angular/core";
import * as moment from 'moment';
import { BanzosUtils } from "../../../../shared/banzos-util";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { Instrumento } from "../../../configuracoes/instrumentos/instrumento";
import { InstrumentoId } from "../../../configuracoes/instrumentos/instrumentoId";
import { Sala } from "../sala";
import { SalaId } from "../salaId";

@Component({
  selector: 'banzos-salas-listagem',
  templateUrl: './salas-listagem.component.html',
  styleUrls: ['./salas-listagem.component.scss']
})
export class SalasListagemComponent{
  
  private salaCollection: AngularFirestoreCollection<Sala>;
  private salas: SalaId[] = [];

  @Input()
  instrumentos = [];

  arraySalaSort = [];

  constructor(
    private banzosUtils: BanzosUtils,
    private readonly afs: AngularFirestore
  ){
    this.salaCollection = afs.collection<Sala>('sala');
    // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // a lot of information about "what happened" with each change. If you want to
    // get the data and the id use the map operator.
    this.salaCollection.snapshotChanges().subscribe(
      actions => actions.map(a => {
        const data = a.payload.doc.data() as SalaId;
        data.id = a.payload.doc.id;
        this.salas.push(data);
      })
    );
   

  }

  ordenarSalas(coluna){
    this.salas = this.banzosUtils.filter(this.salas,coluna,this.arraySalaSort[coluna]==1?true:false)
    if (this.arraySalaSort[coluna] == 1){
      this.arraySalaSort[coluna] = 0
    } else {
      this.arraySalaSort[coluna] = 1
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
