import { Component, OnInit } from '@angular/core';
import { ConfiguracoesService } from '../configuracoes.service';
import { DisciplinasMensagemService } from './disciplinas-mensagem.service';
import { InstrumentoId } from '../instrumentos/instrumentoId';
import { AngularFirestore } from '@angular/fire/firestore';
import { Instrumento } from '../instrumentos/instrumento';

@Component({
  selector: 'banzos-disciplinas',
  templateUrl: './disciplinas.component.html',
  styleUrls: ['./disciplinas.component.scss']
})
export class DisciplinasComponent implements OnInit {

 mensagemDisciplinaSucesso: string;
 mensagemDisciplinaAlerta: string;
 mensagemDisciplinaErro: string;
 instrumentos: InstrumentoId[] = []

  

  constructor(
    private configuracoesService: ConfiguracoesService,
    private disciplinasMensagemService: DisciplinasMensagemService,
    private readonly afs: AngularFirestore
    ) { }

  ngOnInit() {

    this.disciplinasMensagemService.disciplinaMensagemSucesso().subscribe((message) => {this.mensagemDisciplinaSucesso = message});
    //  this.mensagemDisciplinaSucesso = this.disciplinasMensagemService.disciplinaMensagemSucesso().getValue();
     this.disciplinasMensagemService.disciplinaMensagemAlerta().subscribe((message) => {this.mensagemDisciplinaAlerta = message});
     this.disciplinasMensagemService.disciplinaMensagemErro().subscribe((message) => {this.mensagemDisciplinaErro = message});

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
