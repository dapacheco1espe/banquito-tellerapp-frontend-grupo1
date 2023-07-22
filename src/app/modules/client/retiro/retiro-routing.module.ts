import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RetiroComponent } from './retiro.component';

const routes: Routes = [
  {
    path:'',
    component: RetiroComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransferencesRoutingModule { }
