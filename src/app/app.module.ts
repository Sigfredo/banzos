import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AlunosComponent } from './alunos/alunos.component';
import { ProfessoresComponent } from './professores/professores.component';
import { DetailsComponent } from './details/details.component';

import { HttpClientModule } from '@angular/common/http';
import { GradeHorariaComponent } from './grade-horaria/grade-horaria.component';
import { TurmaComponent } from './turma/turma.component';
import { FinanceiroComponent } from './financeiro/financeiro.component';
import { ChamadaComponent } from './chamada/chamada.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    AlunosComponent,
    ProfessoresComponent,
    DetailsComponent,
    GradeHorariaComponent,
    TurmaComponent,
    FinanceiroComponent,
    ChamadaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
