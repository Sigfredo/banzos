import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { DisciplinasModule } from './disciplinas/disciplinas.module';
import { InstrumentosModule } from './instrumentos/instrumentos.module';


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
  ],
  exports: [
    DisciplinasModule,
    InstrumentosModule
  ],
  providers: [
 
  ]
})
export class ConfiguracoesModule { }
