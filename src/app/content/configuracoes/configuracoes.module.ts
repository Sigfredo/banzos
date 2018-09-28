import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { DisciplinasModule } from './disciplinas/disciplinas.module';
import { InstrumentosModule } from './instrumentos/instrumentos.module';
import { ConfiguracoesComponent } from './configuracoes.component';
import { ConfiguracoesService } from './configuracoes.service';
import { ConfiguracoesMensagemService } from './configuracoes-mensagem.service';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    NgbModule,
    DisciplinasModule,
    InstrumentosModule
  ],
  declarations: [
    ConfiguracoesComponent
  ],
  exports: [
    DisciplinasModule,
    InstrumentosModule,
    ConfiguracoesComponent
  ],
  providers: [
    ConfiguracoesService,
    ConfiguracoesMensagemService
  ]
})
export class ConfiguracoesModule { }
