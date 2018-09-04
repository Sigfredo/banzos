import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EdicaoComponent } from './edicao/edicao.component';
import { ListagemComponent } from './listagem/listagem.component';
import { AlunosComponent } from './alunos.component';
import { BanzosMatDatePickerModule } from '../../shared/banzosmatdatepicker.module';


@NgModule({
  imports: [
    CommonModule,
    BanzosMatDatePickerModule,
  ],
  declarations: [
    AlunosComponent,
    EdicaoComponent, 
    ListagemComponent],

  exports: [
    AlunosComponent
  ]
})
export class AlunosModule { }
