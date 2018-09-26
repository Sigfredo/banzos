import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../../shared/shared.module';
import { AppRoutingModule } from '../../../app-routing.module';
import { InstrumentosListagemComponent } from './instrumentos-listagem/instrumentos-listagem.component';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    NgbModule,
 
  ],
  declarations: [
    InstrumentosListagemComponent
  ],
  exports: [
   
  ],
  providers: [
    InstrumentosListagemComponent
  ]
})
export class InstrumentosModule {
}