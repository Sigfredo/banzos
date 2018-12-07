import { Component, OnInit } from '@angular/core';
import { SalasService } from './salas.service';
import { SalasMensagemService } from './salas-mensagem.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Instrumento } from '../instrumentos/instrumento';
import { InstrumentoId } from '../instrumentos/instrumentoId';

@Component({
  selector: 'banzos-salas',
  templateUrl: './salas.component.html',
  styleUrls: ['./salas.component.scss']
})
export class SalasComponent implements OnInit {

  salas = [];
  instrumentos: InstrumentoId[] = []
  mensagemSalaSucesso: string;
  mensagemSalaAlerta: string;
  mensagemSalaErro: string;
  

  constructor(
    private salasService: SalasService,
    private salasMensagemService: SalasMensagemService,
    private readonly afs: AngularFirestore
    ) { }

  ngOnInit() {

    this.salasMensagemService.salaMensagemSucesso().subscribe((message) => {this.mensagemSalaSucesso = message});
     this.salasMensagemService.salaMensagemAlerta().subscribe((message) => {this.mensagemSalaAlerta = message});
     this.salasMensagemService.salaMensagemErro().subscribe((message) => {this.mensagemSalaErro = message});

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
