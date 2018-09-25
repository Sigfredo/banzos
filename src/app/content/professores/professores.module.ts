import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared.module';
import { AppRoutingModule } from '../../app-routing.module';
import { ProfessoresComponent } from './professores.component';
import { ProfessoresEdicaoComponent } from './professores-edicao/professores-edicao.component';
import { ProfessoresListagemComponent } from './professores-listagem/professores-listagem.component';
import { ProfessoresMensagemService } from './professores-mensagem.service';
import { ProfessoresService } from './professores.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    NgbModule
  ],
  declarations: [
    ProfessoresComponent,
    ProfessoresEdicaoComponent,
    ProfessoresListagemComponent
  ],
  exports: [
 
  ],
  providers: [
    ProfessoresComponent,
    ProfessoresEdicaoComponent,
    ProfessoresMensagemService,
    ProfessoresService
  ]
})
export class ProfessoresModule { }
