/*import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovementsRoutingModule } from './movements-routing.module';
import { MovementsComponent } from './movements.component';
import { SharedModule } from 'app/shared/shared.module';


@NgModule({
  declarations: [
    MovementsComponent
  ],
  imports: [
    SharedModule,
    MovementsRoutingModule
  ]
})
export class MovementsModule { }*/


import { NgModule } from '@angular/core';

import { MovementsRoutingModule } from './movements-routing.module';
import { MovementsComponent } from './movements.component';
import { SharedModule } from 'app/shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MovementsService } from './movements.service';

@NgModule({
  declarations: [
    MovementsComponent
  ],
  imports: [
    SharedModule,
    MovementsRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    MovementsService
  ]
})
export class MovementsModule { }