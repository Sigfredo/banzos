
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlunosComponent } from "./alunos/alunos.component";
import { ProfessoresComponent } from "./professores/professores.component";
import { FinanceiroComponent } from "./financeiro/financeiro.component";
import { TurmaComponent } from "./turma/turma.component";
import { GradeHorariaComponent } from "./grade-horaria/grade-horaria.component";

import { AppRoutingModule } from '../app-routing.module';
import { ListagemComponent } from './alunos/listagem/listagem.component';
import { EdicaoComponent } from "./alunos/edicao/edicao.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule, 
    FormsModule, 
    ReactiveFormsModule
  ],
  declarations: [
    AlunosComponent,
    ProfessoresComponent,
    ProfessoresComponent,
    FinanceiroComponent,
    TurmaComponent,
    GradeHorariaComponent,
    ListagemComponent,
    EdicaoComponent

  ],
  exports: [
    AlunosComponent,
    ProfessoresComponent,
    ProfessoresComponent,
    FinanceiroComponent,
    TurmaComponent,
    GradeHorariaComponent
  ]
})
export class ContentModule { }