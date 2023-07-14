import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransferencesRoutingModule } from './transferences-routing.module';
import { TransferencesComponent } from './transferences.component';
import { SharedModule } from 'app/shared/shared.module';


@NgModule({
  declarations: [
    TransferencesComponent
  ],
  imports: [
    SharedModule,
    TransferencesRoutingModule
  ]
})
export class TransferencesModule { }
