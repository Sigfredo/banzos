import { Component, OnInit } from '@angular/core';
import { DisciplinasService } from './disciplinas.service';
import { DisciplinasMensagemService } from './disciplinas-mensagem.service';

@Component({
  selector: 'banzos-disciplinas',
  templateUrl: './disciplinas.component.html',
  styleUrls: ['./disciplinas.component.scss']
})
export class DisciplinasComponent implements OnInit {

  disciplinas = [];
 mensagemDisciplinaSucesso: string;
 mensagemDisciplinaAlerta: string;
 mensagemDisciplinaErro: string;
  

  constructor(
    private disciplinasService: DisciplinasService,
    private disciplinasMensagemService: DisciplinasMensagemService,
    ) { }

  ngOnInit() {

    this.disciplinasMensagemService.disciplinaMensagemSucesso().subscribe((message) => {this.mensagemDisciplinaSucesso = message});
    //  this.mensagemDisciplinaSucesso = this.disciplinasMensagemService.disciplinaMensagemSucesso().getValue();
     this.disciplinasMensagemService.disciplinaMensagemAlerta().subscribe((message) => {this.mensagemDisciplinaAlerta = message});
     this.disciplinasMensagemService.disciplinaMensagemErro().subscribe((message) => {this.mensagemDisciplinaErro = message});

     this.disciplinasService.todosDisciplinas()
    .subscribe(
       (response) => {this.disciplinas = response},
      (error) => {console.log(error)}
    );
  }

}
