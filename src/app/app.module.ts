import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AlunosComponent } from './alunos/alunos.component';
import { ProfessoresComponent } from './professores/professores.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    AlunosComponent,
    ProfessoresComponent,
    DetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule 

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
