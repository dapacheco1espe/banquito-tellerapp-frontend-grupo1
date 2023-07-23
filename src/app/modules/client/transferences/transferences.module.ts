// // retiro.module.ts
// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { TransferencesComponent } from './transferences.component';

// @NgModule({
//   declarations: [TransferencesComponent],
//   imports: [CommonModule, FormsModule],
//   exports: [TransferencesComponent]
// })
//export class TransferencesModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransferencesComponent } from './transferences.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [TransferencesComponent],
  imports: [CommonModule, FormsModule],
  exports: [TransferencesComponent]
})
export class TransferencesModule { }
