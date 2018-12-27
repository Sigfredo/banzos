
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfessoresComponent } from "./professores/professores.component";
import { FinanceiroComponent } from "./financeiro/financeiro.component";
import { TurmaComponent } from "./turma/turma.component";
import { GradeHorariaComponent } from "./grade-horaria/grade-horaria.component";

import { AppRoutingModule } from '../app-routing.module';

import { AlunosModule } from './alunos/alunos.module';
import { ProfessoresModule } from './professores/professores.module';
import { ConfiguracoesModule } from './configuracoes/configuracoes.module';
import { InstrumentosModule } from './configuracoes/instrumentos/instrumentos.module';

import { FullCalendarModule } from 'ng-fullcalendar';
import { GradeHorariaModule } from './grade-horaria/grade-horaria.module';


@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule, 
    AlunosModule,
    InstrumentosModule,
    ProfessoresModule,
    ConfiguracoesModule,
    FullCalendarModule,
    GradeHorariaModule

  ],
  declarations: [
    FinanceiroComponent,
    TurmaComponent,
  ],
  exports: [
    AlunosModule,
    ProfessoresModule,
    FinanceiroComponent,
    TurmaComponent,
    GradeHorariaModule ,
    ConfiguracoesModule,
    InstrumentosModule
  ]
})
export class ContentModule { }