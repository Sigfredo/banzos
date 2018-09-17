
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfessoresComponent } from "./professores/professores.component";
import { FinanceiroComponent } from "./financeiro/financeiro.component";
import { TurmaComponent } from "./turma/turma.component";
import { GradeHorariaComponent } from "./grade-horaria/grade-horaria.component";

import { AppRoutingModule } from '../app-routing.module';

import { AlunosModule } from './alunos/alunos.module';
import { InstrumentosModule } from './instrumentos/instrumentos.module';


@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule, 
    AlunosModule,
    InstrumentosModule

  ],
  declarations: [
    ProfessoresComponent,
    FinanceiroComponent,
    TurmaComponent,
    GradeHorariaComponent,


  ],
  exports: [
    AlunosModule,
    ProfessoresComponent,
    FinanceiroComponent,
    TurmaComponent,
    GradeHorariaComponent
  ]
})
export class ContentModule { }