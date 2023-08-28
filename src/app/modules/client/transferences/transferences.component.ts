import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipList } from '@angular/material/chips';
import { MatDialogRef } from '@angular/material/dialog';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { FuseConfirmationDialogComponent } from '@fuse/services/confirmation/dialog/dialog.component';
import { Observable } from 'rxjs';
import { Account } from '../Models/Account';
import { TransferencesService } from '../services/transferences.service';
import { Transaction } from './Models/Transaction';

@Component({
  selector: 'app-transferences',
  templateUrl: './transferences.component.html',
  styleUrls: ['./transferences.component.scss']
})
export class TransferencesComponent implements OnInit, AfterViewInit {
  @ViewChild('chipList') chipList:MatChipList;
  public formClient:FormGroup;
  public amountForm:FormGroup;
  private _REGEXNUMBERS:RegExp = /^\d+$/;
  public chipSelectedValue : string = '';
  public accounts$:Observable<Account[]>;
  private _selectedAccount:Account;
  constructor(private _formBuilder:FormBuilder, private _changeDetectorRef:ChangeDetectorRef,
    private _transferencesService:TransferencesService, private _fuseConfirmationService:FuseConfirmationService) { }
  ngOnInit(): void {
    this.formClient = this._formBuilder.group({
      accountNumber: ['',[Validators.required]],
    });
    this.amountForm = this._formBuilder.group({
      amount:['',[Validators.required,Validators.min(1)]],
    });
    this.accounts$ = this._transferencesService.accounts$;
    this._changeDetectorRef.markForCheck();
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.chipList.chips.get(0).selected = true;
      this.chipSelectedValue =  this.chipList.selected['value'];
      this._changeDetectorRef.markForCheck();
    }, 0);
    
  }
  public selectThisChip(index:number){
    setTimeout(() => {
      this.chipList.chips.get(index).selected = !this.chipList.chips.get(index).selected;
      this.chipSelectedValue =  this.chipList.selected != undefined ? this.chipList.selected['value'] : '';
      this._changeDetectorRef.markForCheck();
    }, 0);
  }

  public getAccounts(){
    const accountParameters = {
      'Cédula' : 'CED',
      'RUC': 'RUC',
      'Pasaporte': 'PAS',
      'Cuenta': 'ACC',
    }
    const param = accountParameters[this.chipSelectedValue];
    this._transferencesService.findAccountsByParameter(param,this.formClient.get('accountNumber').value).subscribe({
      next:()=>{
 
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
  
  public selectThisAccount(selectedAccount:Account,elementIndex:string){
    const card = document.getElementById(`card-${elementIndex}`);
    if(this._selectedAccount == undefined ){
      this._selectedAccount = {...selectedAccount};
     card.classList.add("bg-green-50");
    }else if(selectedAccount.codeInternalAccount == this._selectedAccount.codeInternalAccount){
      this._selectedAccount = {...selectedAccount};
      card.classList.contains('bg-green-50') ? card.classList.remove('bg-green-50') : card.classList.add('bg-green-50') ;
    }else if(selectedAccount.codeInternalAccount != this._selectedAccount.codeInternalAccount){
      this._selectedAccount = {...selectedAccount};
      this.accounts$.subscribe({
        next:(res)=>{
          res.forEach((it,index) => {
            const auxCard = document.getElementById(`card-${index}`);
            auxCard.classList.contains('bg-green-50') ?? auxCard.classList.remove('bg-green-50');
          });
        }
      });
      card.classList.contains('bg-green-50') ? card.classList.remove('bg-green-50') : card.classList.add('bg-green-50') ;
    }
  }

  public transferToDestinyAccount(){
    this._generateConfirmationTransferenceDialog().afterClosed().subscribe({
      next:(res:string)=>{
        if(res == 'confirmed'){
          const transaction:Transaction=  {
            reference:'Transferencia',
            ammount: this.amountForm.get('amount').value,
            creditorAccount: this._selectedAccount.codeInternalAccount,
            debtorAccount: this._selectedAccount.codeInternalAccount,
            transactionType: 'TRANSFER',
            notes : "",
          };
          this._transferencesService.generateTransference(this._selectedAccount,this.amountForm.get('amount').value).subscribe({
            next:(res)=>{
              const confirmation = this._fuseConfirmationService.open({
                title: 'Transaccion realizada',
                message: 'La transacción ha sido realizada con éxito',
                icon:{
                  color: 'success'
                },
                actions:{
                  confirm:{
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
        <p>Se va a realizar un depósito en la cuenta <span class="font-bold">${this._selectedAccount.codeInternalAccount}</span>
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
