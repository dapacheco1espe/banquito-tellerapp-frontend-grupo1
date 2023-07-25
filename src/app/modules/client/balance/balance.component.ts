import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BalanceService } from '../services/balance.service';
import { Observable, Subject } from 'rxjs';
import { Account } from '../Models/Account';
import { HttpErrorResponse } from '@angular/common/http';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import moment from 'moment';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
  encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BalanceComponent implements OnInit, OnDestroy {
  private exportAsConfig: ExportAsConfig = {
    type: 'pdf', // the type you want to download
    elementIdOrContent: 'balancePdf', // the id of html/table element
    options: { // html-docx-js document options
      margin: [30, 30],
      jsPDF: { unit: 'px', format: [800, 600], orientation: 'l' },
    }
  }
  private _REGEXNUMBERS:RegExp = /^\d+$/;
  private _unsubscribeAll:Subject<any> = new Subject<any>();
  public account$:Observable<Account>;
  public formClient:FormGroup;
  public currentDate:string = '';
  private _account:Account;
  constructor(private _formBuilder:FormBuilder, private _changeDetectorRef:ChangeDetectorRef,
    private _balanceService:BalanceService, private _fuseConfirmationService:FuseConfirmationService,
    private _exportAsService:ExportAsService) {
      
    }

  ngOnInit(): void {
    this.formClient = this._formBuilder.group({
      //accountNumber: ['',[Validators.required, Validators.pattern(this._REGEXNUMBERS)]],
      accountNumber: ['',[Validators.required]],
    });
    this.account$ = this._balanceService.accounts$;
    this._changeDetectorRef.markForCheck();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
    this._balanceService.accountValue = null;
  }
  public findBalanceByAccountNumber(){
    this.currentDate = moment(new Date()).toISOString();
    this._balanceService.findBalanceByAccountNumber(this.formClient.get('accountNumber').value)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe({
      next:(account:Account)=>{
        this._account = {...account};
        this._changeDetectorRef.markForCheck();
      },
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
    this.exportAsConfig.options.jsPDF.format = [window.innerWidth - 800,window.innerHeight -300];
    //this._exportAsService.save(this.exportAsConfig,`Comprobante-${this._account.accountClientData.lastname}`).subscribe({});
    this._exportAsService.save(this.exportAsConfig,`Comprobante`).subscribe({});
  }
}
