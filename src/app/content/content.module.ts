
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfessoresComponent } from "./professores/professores.component";
import { FinanceiroComponent } from "./financeiro/financeiro.component";
import { TurmaComponent } from "./turma/turma.component";
import { GradeHorariaComponent } from "./grade-horaria/grade-horaria.component";

import { AppRoutingModule } from '../app-routing.module';

import { AlunosModule } from './alunos/alunos.module';
import { InstrumentosModule } from './instrumentos/instrumentos.module';
import { ProfessoresModule } from './professores/professores.module';


@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule, 
    AlunosModule,
    InstrumentosModule,
    ProfessoresModule

  ],
  declarations: [
    FinanceiroComponent,
    TurmaComponent,
    GradeHorariaComponent,


  ],
  exports: [
    AlunosModule,
    ProfessoresModule,
    FinanceiroComponent,
    TurmaComponent,
    GradeHorariaComponent
  ]
})
export class ContentModule { }