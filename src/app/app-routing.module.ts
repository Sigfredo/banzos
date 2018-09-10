import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlunosComponent } from './content/alunos/alunos.component';

import { ProfessoresComponent } from './content/professores/professores.component';
import { FinanceiroComponent } from './content/financeiro/financeiro.component';
import { EditarComponent } from './content/alunos/editar/editar.component';

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
    }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
