import { Component, OnInit, ApplicationRef } from '@angular/core';
import { AlunosService } from './alunos.service';
import { AlunosMensagemService } from './alunos-mensagem.service';
import { BanzosUtils } from '../../shared/banzos-util';
import { Aluno } from './aluno';
import { AngularFirestoreCollection, AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AlunoId } from "./alunoId"
import { InstrumentoId } from '../configuracoes/instrumentos/instrumentoId';
import { Instrumento } from '../configuracoes/instrumentos/instrumento';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.scss']
})
export class AlunosComponent implements OnInit {

 mensagemAlunoSucesso: string;
 mensagemAlunoAlerta: string;
 mensagemAlunoErro: string;
 instrumentos: InstrumentoId[] = []
 
  

  constructor(
    private alunosService: AlunosService,
    private alunosMensagemService: AlunosMensagemService,
    private banzosUtils: BanzosUtils,
    private readonly afs: AngularFirestore
    ) {
    }
     

  ngOnInit() {

    this.alunosMensagemService.alunoMensagemSucesso().subscribe((message) => {this.mensagemAlunoSucesso = message});
     this.alunosMensagemService.alunoMensagemAlerta().subscribe((message) => {this.mensagemAlunoAlerta = message});
     this.alunosMensagemService.alunoMensagemErro().subscribe((message) => {this.mensagemAlunoErro = message});

     //busca os instrumentos
     this.afs.collection<Instrumento>('instrumento').snapshotChanges().subscribe(  
      actions => actions.map(a => {
                    const data = a.payload.doc.data() as InstrumentoId;
                    data.id = a.payload.doc.id;
                    this.instrumentos.push(data);
                })
    );
  }

}
