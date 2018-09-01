import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EdicaoComponent } from './edicao/edicao.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [EdicaoComponent],
  exports: [ReactiveFormsModule]
})
export class AlunosModule { }
