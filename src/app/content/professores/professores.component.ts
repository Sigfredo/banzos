import { Component, OnInit } from '@angular/core';
import { ProfessoresService } from './professores.service';
import { ProfessoresMensagemService } from './professores-mensagem.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Instrumento } from '../configuracoes/instrumentos/instrumento';
import { InstrumentoId } from '../configuracoes/instrumentos/instrumentoId';

@Component({
  selector: 'banzos-professores',
  templateUrl: './professores.component.html',
  styleUrls: ['./professores.component.scss']
})
export class ProfessoresComponent implements OnInit {

  professores = [];
  instrumentos: InstrumentoId[] = []
  mensagemProfessorSucesso: string;
  mensagemProfessorAlerta: string;
  mensagemProfessorErro: string;
  

  constructor(
    private professoresService: ProfessoresService,
    private professoresMensagemService: ProfessoresMensagemService,
    private readonly afs: AngularFirestore
    ) { }

  ngOnInit() {

    this.professoresMensagemService.professorMensagemSucesso().subscribe((message) => {this.mensagemProfessorSucesso = message});
     this.professoresMensagemService.professorMensagemAlerta().subscribe((message) => {this.mensagemProfessorAlerta = message});
     this.professoresMensagemService.professorMensagemErro().subscribe((message) => {this.mensagemProfessorErro = message});

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
