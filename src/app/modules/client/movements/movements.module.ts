import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FuseAlertModule } from '@fuse/components/alert';
import { SharedModule } from 'app/shared/shared.module';
import { MovementsRoutingModule } from './movements-routing.module';
import { MovementsComponent } from './movements.component';
import { MovementsService } from './movements.service';
@NgModule({
  declarations: [
    MovementsComponent
  ],
  imports: [
    SharedModule,
    MovementsRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    FuseAlertModule,
  ],
  providers: [
    MovementsService
  ]
})
export class MovementsModule { }
