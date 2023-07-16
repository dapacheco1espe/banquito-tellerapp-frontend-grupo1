import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BalanceService } from '../services/balance.service';
import { Observable } from 'rxjs';
import { Account } from '../Models/Account';
import { HttpErrorResponse } from '@angular/common/http';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import moment from 'moment';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
  encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BalanceComponent implements OnInit {
  private exportAsConfig: ExportAsConfig = {
    type: 'pdf', // the type you want to download
    elementIdOrContent: 'balancePdf', // the id of html/table element
    options: { // html-docx-js document options
      margin: [30, 30],
      jsPDF: { unit: 'px', format: [800, 600], orientation: 'l' },
    }
  }
  private _REGEXNUMBERS:RegExp = /^\d+$/;
  public account$:Observable<Account>;
  public formClient:FormGroup;
  public currentDate:string = '';
  constructor(private _formBuilder:FormBuilder, private _changeDetectorRef:ChangeDetectorRef,
    private _balanceService:BalanceService, private _fuseConfirmationService:FuseConfirmationService,
    private _exportAsService:ExportAsService) {
      
    }

  ngOnInit(): void {
    this.formClient = this._formBuilder.group({
      accountNumber: ['',[Validators.required, Validators.pattern(this._REGEXNUMBERS)]],
    });
    this.account$ = this._balanceService.accounts$;
    this._changeDetectorRef.markForCheck();
  }

  public findBalanceByAccountNumber(){
    this.currentDate = moment(new Date()).toISOString();
    this._balanceService.findBalanceByAccountNumber(this.formClient.get('accountNumber').value).subscribe({
      error:(error:HttpErrorResponse) => {
        this._fuseConfirmationService.open({
          title: 'Consulta de balance',
          message: 'La cuenta solicitada no existe',
          actions:{
            confirm:{
              label: 'Aceptar',
              color: 'primary'
            },
            cancel:{
              show: false,
            }
          }
        });
      }
    });
    this._changeDetectorRef.markForCheck();
  }

  public downloadAsPdf(){
    const voucherElement = document.getElementById('balancePdf');
    this.exportAsConfig.options.jsPDF.format = [window.innerWidth - 800,window.innerHeight -300];
    this._exportAsService.save(this.exportAsConfig,'Comprobante').subscribe({});
  }
}
