import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlunosComponent } from './alunos/alunos.component';
import { DetailsComponent } from './details/details.component';
import { ProfessoresComponent } from './professores/professores.component';

const routes: Routes = [
  {
  path: '',
  component: AlunosComponent
  },
  {
  path: 'details/:id',
  component: DetailsComponent
  },
  {
  path: 'professores',
  component: ProfessoresComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
