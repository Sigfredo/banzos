import { Component, Input, OnInit } from "@angular/core";

import { EditarComponent } from "../editar/editar.component";
import { Aluno } from "../aluno";
import { AlunosMensagemService } from "../alunos-mensagem.service";
import { BanzosUtils } from "../../../shared/banzos-util";
import { AngularFirestoreCollection, AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AlunoId } from "../alunoId";
import * as moment from 'moment';
import {firestore} from 'firebase/app';
import Timestamp = firestore.Timestamp;

@Component({
  selector: 'banzos-aluno-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.scss']
})
export class ListagemComponent implements OnInit {

  private alunoCollection: AngularFirestoreCollection<Aluno>;
  // private alunos: Observable<AlunoId[]>;
  private alunos: AlunoId[] = [];

  constructor(
    private banzosUtils: BanzosUtils,
    private readonly afs: AngularFirestore
  ){
    console.log("Entrei");
    this.alunoCollection = afs.collection<Aluno>('aluno');
    // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // a lot of information about "what happened" with each change. If you want to
    // get the data and the id use the map operator.
    this.alunoCollection.snapshotChanges().subscribe(
      actions => actions.map(a => {
        const data = a.payload.doc.data() as Aluno;
        const id = a.payload.doc.id;
        this.alunos.push({ id, ...data });
        console.log(this.alunos)
      })
    );
   

  }
  
  // @Input()
  // alunos = [];

  @Input()
  instrumentos = [];

  arrayAlunoSort = [];


  ngOnInit(): void {
  }

  ordenarAlunos(coluna){
    if(typeof this.arrayAlunoSort[coluna]==='undefined'){
      this.arrayAlunoSort = [];
    }
    this.alunos = this.banzosUtils.filter(this.alunos,coluna,this.arrayAlunoSort[coluna]==1?true:false)
    if (this.arrayAlunoSort[coluna] == 1){
      this.arrayAlunoSort[coluna] = 0
    } else {
      this.arrayAlunoSort[coluna] = 1
    }
  }

  buscarIdade(nascimento){
    
    return this.banzosUtils.buscarIdade(nascimento)
  }

  extrairData(data){
    return this.banzosUtils.extrairData(data);
  }


}
