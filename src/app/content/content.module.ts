
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlunosComponent } from "./alunos/alunos.component";
import { DetailsComponent } from "./alunos/details/details.component";
import { ProfessoresComponent } from "./professores/professores.component";
import { FinanceiroComponent } from "./financeiro/financeiro.component";
import { TurmaComponent } from "./turma/turma.component";
import { GradeHorariaComponent } from "./grade-horaria/grade-horaria.component";

import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  declarations: [
    AlunosComponent,
    DetailsComponent,
    ProfessoresComponent,
    ProfessoresComponent,
    FinanceiroComponent,
    TurmaComponent,
    GradeHorariaComponent

  ],
  exports: [
    AlunosComponent,
    DetailsComponent,
    ProfessoresComponent,
    ProfessoresComponent,
    FinanceiroComponent,
    TurmaComponent,
    GradeHorariaComponent
  ]
})
export class ContentModule { }