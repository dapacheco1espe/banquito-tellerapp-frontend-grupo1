import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransferencesRoutingModule } from './transferences-routing.module';
import { TransferencesComponent } from './transferences.component';
import { SharedModule } from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';

@NgModule({
  declarations: [
    TransferencesComponent
  ],
  imports: [
    SharedModule,
    TransferencesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
  ]
})
export class TransferencesModule { }
