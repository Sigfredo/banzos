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

import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

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
    AngularFirestore,
          // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
