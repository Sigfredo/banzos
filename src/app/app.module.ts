import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { CoreModule } from './core/core.module';
import { ContentModule } from "./content/content.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlunosService } from './content/alunos/alunos.service';

import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { ChamadaComponent } from './content/turma/chamada/chamada.component';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    ChamadaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    ContentModule,
    NoopAnimationsModule,
    SharedModule

  ],
  providers: [
    FormsModule, 
    ReactiveFormsModule
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
