import { NgModule } from '@angular/core';
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
export class MovementsModule { }
