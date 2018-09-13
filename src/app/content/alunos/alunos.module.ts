import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditarComponent } from './editar/editar.component';
import { ListagemComponent } from './listagem/listagem.component';
import { AlunosComponent } from './alunos.component';
import { SharedModule } from '../../shared/shared.module';
import { AppRoutingModule } from '../../app-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    NgbModule
  ],
  declarations: [
    AlunosComponent,
    EditarComponent, 
    ListagemComponent],

  exports: [
    AlunosComponent
  ],
  providers: [
    EditarComponent
  ]
})
export class AlunosModule { }
