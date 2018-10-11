import { Component, OnInit, ApplicationRef } from '@angular/core';
import { AlunosService } from './alunos.service';
import { AlunosMensagemService } from './alunos-mensagem.service';
import { BanzosUtils } from '../../shared/banzos-util';
import { AngularFirestore, DocumentSnapshot, DocumentChangeAction } from '@angular/fire/firestore';
import { Aluno } from './aluno';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.scss']
})
export class AlunosComponent implements OnInit {

 alunos = [];
 mensagemAlunoSucesso: string;
 mensagemAlunoAlerta: string;
 mensagemAlunoErro: string;
 
 teste: DocumentChangeAction<any>;
  

  constructor(
    private alunosService: AlunosService,
    private alunosMensagemService: AlunosMensagemService,
    private db: AngularFirestore
    ) { }

  ngOnInit() {

    this.alunosMensagemService.alunoMensagemSucesso().subscribe((message) => {this.mensagemAlunoSucesso = message});
    //  this.mensagemAlunoSucesso = this.alunosMensagemService.alunoMensagemSucesso().getValue();
     this.alunosMensagemService.alunoMensagemAlerta().subscribe((message) => {this.mensagemAlunoAlerta = message});
     this.alunosMensagemService.alunoMensagemErro().subscribe((message) => {this.mensagemAlunoErro = message});

     this.db.collection('aluno').snapshotChanges()
     .subscribe(
        (response) => {this.alunos = response, this.teste = this.alunos[0], console.log(this.teste.payload.doc.get('nascimento'))},
       (error) => {console.log(error)}
     );
  }

}
