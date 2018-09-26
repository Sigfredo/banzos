import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../../shared/shared.module';
import { AppRoutingModule } from '../../../app-routing.module';
import { DisciplinasComponent } from './disciplinas.component';
import { DisciplinasEdicaoComponent } from './disciplinas-edicao/disciplinas-edicao.component';
import { DisciplinasListagemComponent } from './disciplinas-listagem/disciplinas-listagem.component';
import { DisciplinasMensagemService } from './disciplinas-mensagem.service';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    NgbModule,
  ],
  declarations: [
    DisciplinasComponent,
    DisciplinasEdicaoComponent,
    DisciplinasListagemComponent,
  ],
  exports: [
 
  ],
  providers: [
    DisciplinasComponent,
    DisciplinasEdicaoComponent,
    DisciplinasMensagemService,
  ]
})
export class DisciplinasModule { }
