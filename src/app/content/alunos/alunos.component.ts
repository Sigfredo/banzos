import { Component, OnInit, ApplicationRef } from '@angular/core';
import { AlunosService } from './alunos.service';
import { AlunosMensagemService } from './alunos-mensagem.service';
import { BanzosUtils } from '../../shared/banzos-util';
import { Aluno } from './aluno';
import { AngularFirestoreCollection, AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AlunoId } from "./alunoId"

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.scss']
})
export class AlunosComponent implements OnInit {

 mensagemAlunoSucesso: string;
 mensagemAlunoAlerta: string;
 mensagemAlunoErro: string;
//  instrumentos = [];
 private alunoCollection: AngularFirestoreCollection<Aluno>;
//  alunos: Observable<AlunoId[]>;
  

  constructor(
    private alunosService: AlunosService,
    private alunosMensagemService: AlunosMensagemService,
    private banzosUtils: BanzosUtils,
    private readonly afs: AngularFirestore
    ) {
      // this.alunoCollection = afs.collection<Aluno>('aluno');
      // .snapshotChanges() returns a DocumentChangeAction[], which contains
      // a lot of information about "what happened" with each change. If you want to
      // get the data and the id use the map operator.
      // this.alunos = this.alunoCollection.snapshotChanges().pipe(
      //   map(actions => actions.map(a => {
      //     const data = a.payload.doc.data() as Aluno;
      //     const id = a.payload.doc.id;
      //     return { id, ...data };
      //   }))
      // );
  
    }
     

  ngOnInit() {

    this.alunosMensagemService.alunoMensagemSucesso().subscribe((message) => {this.mensagemAlunoSucesso = message});
    //  this.mensagemAlunoSucesso = this.alunosMensagemService.alunoMensagemSucesso().getValue();
     this.alunosMensagemService.alunoMensagemAlerta().subscribe((message) => {this.mensagemAlunoAlerta = message});
     this.alunosMensagemService.alunoMensagemErro().subscribe((message) => {this.mensagemAlunoErro = message});

    //  this.banzosUtils.getInstrumentos()
    //  .subscribe(
    //    (instrumentos) => {this.instrumentos = instrumentos, console.log(this.instrumentos.payload)}
    //  );
  }

}
