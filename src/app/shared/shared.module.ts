import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { MaterialModule } from './material.module';
import {ReactiveFormsModule } from '@angular/forms';

import { RouterLink } from '@angular/router';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterLink,
    NgIf
    
  ],
  exports :[MaterialModule , ReactiveFormsModule , RouterLink ,NgIf]
        
})
export class SharedModule { }
