import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { FuseConfirmationDialogComponent } from '@fuse/services/confirmation/dialog/dialog.component';
import { Account } from '../Models/Account';
import { BalanceService } from '../services/balance.service';
import { TransferencesService } from '../services/transferences.service';
import { Transaction } from './Models/Transaction';

@Component({
  selector: 'app-transferences',
  templateUrl: './transferences.component.html',
  styleUrls: ['./transferences.component.scss']
})
export class TransferencesComponent implements OnInit, AfterViewInit {
  public formClientDebtor:FormGroup;
  public formClientCreditor:FormGroup;
  public amountForm:FormGroup;
  private _REGEXNUMBERS:RegExp = /^\d+$/;
  public chipSelectedValue : string = '';
  public accountsDebtor:Account;
  public creditorAcc:Account;
  public creditorData:{
    firstName:string,
    lastName:string,
    documentId:string,
  } = {
    firstName:'',
    lastName: '',
    documentId:'',
  };
  constructor(private _formBuilder:FormBuilder, private _changeDetectorRef:ChangeDetectorRef,
    private _transferencesService:TransferencesService, private _balanceService:BalanceService, private _fuseConfirmationService:FuseConfirmationService) { }
  ngOnInit(): void {
    this.formClientDebtor = this._formBuilder.group({
      accountNumber: ['',[Validators.required]],
    });
    this.formClientCreditor = this._formBuilder.group({
      accountNumber: ['',[Validators.required]],
    });
    this.amountForm = this._formBuilder.group({
      amount:['',[Validators.required,Validators.min(1)]],
    });
    this._changeDetectorRef.markForCheck();
  }
  ngAfterViewInit(): void {

  }

  public getAccounts(type:'credtor' | 'debtor'){
    const accountParameters = {
      'Cédula' : 'CED',
      'RUC': 'RUC',
      'Pasaporte': 'PAS',
      'Cuenta': 'ACC',
    }
    const param = accountParameters[this.chipSelectedValue];
    this._transferencesService.findAccountsByParameter(param,type == 'debtor' ? this.formClientDebtor.get('accountNumber').value : this.formClientCreditor.get('accountNumber').value).subscribe({
      next:(response)=>{
        if(type == 'credtor'){
          this.creditorAcc = response;
          this._balanceService.findClientInfo(this.creditorAcc.clientUk).subscribe({
            next:(client)=>{
              this.creditorData.firstName = client.firstName;
              this.creditorData.lastName = client.lastName;
              this.creditorData.documentId = client.documentId;
              this._changeDetectorRef.markForCheck();
            }
          });
        }else{
          this.accountsDebtor = response;
          
        }
      },
      error:(err:HttpErrorResponse) =>{
        const confirmation = this._fuseConfirmationService.open({
          title: 'Error en consulta',
          message: 'La cuenta no existe, por favor intentelo de nuevo',
          actions:{
            confirm:{
              color:'primary'
            },
            cancel:{
              show:false,
            }
          }
        });
      }
    });
  }
  


  public transferToDestinyAccount(){
    this._generateConfirmationTransferenceDialog().afterClosed().subscribe({
      next:(res:string)=>{
        if(res == 'confirmed'){
          const transaction:Transaction=  {
            reference:'Transferencia',
            ammount: this.amountForm.get('amount').value,
            creditorAccount: this.creditorAcc.codeInternalAccount,
            creditorBankCode: "",
            debtorBankCode: "",
            debtorAccount: this.accountsDebtor.codeInternalAccount,
            transactionType: 'TRANSFER',
            notes : "Transferencia bancaria teller",
          };

          this._transferencesService.generateTransference(transaction,this.amountForm.get('amount').value).subscribe({
            next:(res)=>{
              const confirmation = this._fuseConfirmationService.open({
                title: 'Transaccion realizada',
                message: 'La transacción ha sido realizada con éxito',
                icon:{
                  color: 'success'
                },
                actions:{
                  confirm:{
                    label:'Aceptar',
                    color:'primary'
                  },
                  cancel:{
                    show:false,
                  }
                }
              });
            },
            error:(e:HttpErrorResponse) => {
              const confirmation = this._fuseConfirmationService.open({
                title: 'Transaccion rechazada',
                message: 'La transacción no se pudo realizar, intente mas tarde',
                actions:{
                  confirm:{
                    color:'primary'
                  },
                  cancel:{
                    show:false,
                  }
                }
              });
            }
          });
        }
      }
    });
    
  }

  private _generateConfirmationTransferenceDialog():MatDialogRef<FuseConfirmationDialogComponent,any>{
    const confirmation = this._fuseConfirmationService.open({
      title: 'Confirmación de transferencia',
      message: `<h1>Antes de continuar verifique la siguiente informacion con el cliente</h1>
        <p>Se va a realizar un depósito en la cuenta <span class="font-bold">${this.creditorAcc.codeInternalAccount}</span>
        por el valor de <span class="font-bold">$ ${this.amountForm.get('amount').value} USD</span>
        </p>
      `,
      icon:{
        color: 'info'
      },
      actions:{
        confirm:{
          color:'primary',
          label:'Confirmar'
        },
        cancel:{
          show:true,
          label:'Cancelar'
        }
      }
    });
    return confirmation;
  }
}
