import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importa el módulo FormsModule

import { MatButtonModule } from '@angular/material/button';
import { FuseAlertModule } from '@fuse/components/alert';
import { WithdrawRoutingModule } from './withdraw-routing.module';
import { WithdrawComponent } from './withdraw.component';

@NgModule({
  declarations: [
    WithdrawComponent
  ],
  imports: [
    CommonModule,
    WithdrawRoutingModule,
    FormsModule,
    FuseAlertModule,
    MatButtonModule
  ]
})
export class WithdrawModule { }
