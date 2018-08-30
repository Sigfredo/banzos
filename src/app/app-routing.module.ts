import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlunosComponent } from './content/alunos/alunos.component';
import { DetailsComponent } from './content/alunos/details/details.component';
import { ProfessoresComponent } from './content/professores/professores.component';
import { FinanceiroComponent } from './content/financeiro/financeiro.component';

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
  path: 'details/:id',
  component: DetailsComponent
  },
  {
  path: 'professores',
  component: ProfessoresComponent
  },
  {
  path: 'financeiro',
  component: FinanceiroComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
