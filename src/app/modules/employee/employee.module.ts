import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { SharedModule } from 'app/shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    EmployeeRoutingModule
  ]
})
export class EmployeeModule { }
