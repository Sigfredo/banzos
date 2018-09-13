import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BanzosFilterPipe } from './banzos-filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    FormsModule, 
    ReactiveFormsModule,
  ],
  declarations: [
    BanzosFilterPipe
  ],
  exports: [MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    FormsModule, 
    ReactiveFormsModule,
    BanzosFilterPipe
  ]
})
export class SharedModule { }