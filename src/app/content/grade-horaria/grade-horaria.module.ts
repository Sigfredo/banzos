import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared.module';
import { AppRoutingModule } from '../../app-routing.module';
import { GradeHorariaComponent } from './grade-horaria.component';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    NgbModule,
    BrowserModule

  ],
  declarations: [
  GradeHorariaComponent
  ],
  exports: [
 
  ],
  providers: [
    GradeHorariaComponent 
  ]
})
export class GradeHorariaModule { }
