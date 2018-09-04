
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutComponent } from './shell/layout/layout.component';
import { HeaderComponent } from './shell/header/header.component';
import { SidebarComponent } from './shell/sidebar/sidebar.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  declarations: [
    LayoutComponent, 
    HeaderComponent, 
    SidebarComponent
  ],
  exports: [LayoutComponent]
})
export class CoreModule { }