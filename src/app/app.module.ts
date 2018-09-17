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
import { AlunosMensagemService } from './content/alunos/alunos-mensagem.service';
import { AlunosComponent } from './content/alunos/alunos.component';
import { ChamadaComponent } from './content/turma/chamada/chamada.component';


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

  ],
  providers: [AlunosService, AlunosMensagemService, FormsModule, ReactiveFormsModule, AlunosComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
