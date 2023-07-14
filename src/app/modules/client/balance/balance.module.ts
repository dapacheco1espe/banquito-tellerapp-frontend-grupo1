import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BalanceRoutingModule } from './balance-routing.module';
import { BalanceComponent } from './balance.component';
import { SharedModule } from 'app/shared/shared.module';


@NgModule({
  declarations: [
    BalanceComponent
  ],
  imports: [
    SharedModule,
    BalanceRoutingModule
  ]
})
export class BalanceModule { }
