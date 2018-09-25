import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlunosComponent } from './content/alunos/alunos.component';

import { ProfessoresComponent } from './content/professores/professores.component';
import { FinanceiroComponent } from './content/financeiro/financeiro.component';
import { EditarComponent } from './content/alunos/editar/editar.component';
import { ProfessoresEdicaoComponent } from './content/professores/professores-edicao/professores-edicao.component';

const routes: Routes = [
  {
  path: '',
  component: AlunosComponent
  },
  {
    path: 'alunos',
    component: AlunosComponent
    },
  {
  path: 'professores',
  component: ProfessoresComponent
  },
  {
  path: 'financeiro',
  component: FinanceiroComponent
  },
  {
    path: 'aluno/:id',
    component: EditarComponent
  },
  {
    path: 'novo-aluno',
    component: EditarComponent
  },
  {
    path: 'novo-professor',
    component: ProfessoresEdicaoComponent
  },
  {
    path: 'professor/:id',
    component: ProfessoresEdicaoComponent
  }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
