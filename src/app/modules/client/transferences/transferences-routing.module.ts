// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { TransferencesComponent } from './transferences.component';

// const routes: Routes = [
//   {
//     path:'',
//     component: TransferencesComponent,
//   }
// ];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class TransferencesRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransferencesComponent } from './transferences.component';

const routes: Routes = [
  {
    path:'',
    component: TransferencesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransferencesRoutingModule { }
