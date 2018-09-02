import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EdicaoComponent } from './edicao/edicao.component';
import { ListagemComponent } from './listagem/listagem.component';
import { AlunosComponent } from './alunos.component';


@NgModule({
  imports: [
    CommonModule,


  ],
  declarations: [AlunosComponent, EdicaoComponent, ListagemComponent],
  providers: [

  ]
})
export class AlunosModule { }
