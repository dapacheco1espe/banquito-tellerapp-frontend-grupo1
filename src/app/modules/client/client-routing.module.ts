import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'balance',
    loadChildren: () => import('./balance/balance.module') .then(m => m.BalanceModule),
  },
  {
    path: 'movements',
    loadChildren: () => import('./movements/movements.module') .then(m => m.MovementsModule),
  },
  {
    path: 'transferences',
    loadChildren: () => import('./transferences/transferences.module') .then(m => m.TransferencesModule),
  },
  {
    path: 'withdraw',
    loadChildren: () => import('./withdraw/withdraw.module') .then(m => m.WithdrawModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
