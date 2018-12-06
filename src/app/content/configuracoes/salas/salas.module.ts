import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../../shared/shared.module';
import { AppRoutingModule } from '../../../app-routing.module';
import { SalasComponent } from './salas.component';
import { SalasEdicaoComponent } from './salas-edicao/salas-edicao.component';
import { SalasListagemComponent } from './salas-listagem/salas-listagem.component';
import { SalasMensagemService } from './salas-mensagem.service';
import { SalasService } from './salas.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    NgbModule
  ],
  declarations: [
    SalasComponent,
    SalasEdicaoComponent,
    SalasListagemComponent
  ],
  exports: [
 
  ],
  providers: [
    SalasComponent,
    SalasEdicaoComponent,
    SalasMensagemService,
    SalasService
  ]
})
export class SalasModule { }
