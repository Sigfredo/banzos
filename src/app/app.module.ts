import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { CoreModule } from './core/core.module';
import { ContentModule } from "./content/content.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { ChamadaComponent } from './content/turma/chamada/chamada.component';
import { SharedModule } from './shared/shared.module';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';


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
    SharedModule,
    AngularFireModule.initializeApp(environment.firebase)

  ],
  providers: [
    FormsModule, 
    ReactiveFormsModule,
    AngularFirestore
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
