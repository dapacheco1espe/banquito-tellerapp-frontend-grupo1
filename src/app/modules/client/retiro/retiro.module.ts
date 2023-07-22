// retiro.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RetiroComponent } from './retiro.component';

@NgModule({
  declarations: [RetiroComponent],
  imports: [CommonModule, FormsModule],
  exports: [RetiroComponent]
})
export class RetiroModule { }

