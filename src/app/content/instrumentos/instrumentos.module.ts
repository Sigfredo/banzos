import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { InstrumentosService } from './instrumentos.service';



@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [

  ],

  exports: [
  ],
  providers: [
    InstrumentosService
  ]
})
export class InstrumentosModule { }
