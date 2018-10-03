import { Component, Input, OnInit } from "@angular/core";
import * as moment from 'moment';

import { Disciplina } from "../disciplina";
import { DisciplinasMensagemService } from "../disciplinas-mensagem.service";

@Component({
  selector: 'banzos-disciplinas-listagem',
  templateUrl: './disciplinas-listagem.component.html',
  styleUrls: ['./disciplinas-listagem.component.scss']
})
export class DisciplinasListagemComponent {
  
  constructor(
    private disciplinasMensagemService: DisciplinasMensagemService
  ){ }

  @Input()
  disciplinas = [];

  limparMensagens(){
     this.disciplinasMensagemService.disciplinaMensagemSucesso().next(null);
     this.disciplinasMensagemService.disciplinaMensagemAlerta().next(null);
     this.disciplinasMensagemService.disciplinaMensagemErro().next(null);
  }
  
}
