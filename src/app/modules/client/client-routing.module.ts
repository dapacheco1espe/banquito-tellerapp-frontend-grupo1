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
    path: 'retiro',
    loadChildren: () => import('./retiro/retiro.module') .then(m => m.RetiroModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
