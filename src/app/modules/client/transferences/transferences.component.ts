import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipList } from '@angular/material/chips';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Observable } from 'rxjs';
import { Account } from '../Models/Account';
import { TransferencesService } from '../services/transferences.service';

@Component({
  selector: 'app-transferences',
  templateUrl: './transferences.component.html',
  styleUrls: ['./transferences.component.scss']
})
export class TransferencesComponent implements OnInit, AfterViewInit {
  @ViewChild('chipList') chipList:MatChipList;
  public formClient:FormGroup;
  private _REGEXNUMBERS:RegExp = /^\d+$/;
  public chipSelectedValue : string = '';
  public accounts$:Observable<Account[]>;
  private _selectedAccount:Account;
  constructor(private _formBuilder:FormBuilder, private _changeDetectorRef:ChangeDetectorRef,
    private _transferencesService:TransferencesService, private _fuseConfirmationService:FuseConfirmationService) { }
  ngOnInit(): void {
    this.formClient = this._formBuilder.group({
      accountNumber: ['',[Validators.required, Validators.pattern(this._REGEXNUMBERS)]],
    });
    this.accounts$ = this._transferencesService.accounts$;
    this._changeDetectorRef.markForCheck();
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.chipList.chips.get(0).selected = true;
      this.chipSelectedValue =  this.chipList.selected['value'];
      this._changeDetectorRef.markForCheck();2
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
    this._transferencesService.findAccountsByParameter(param,this.formClient.get('accountNumber').value).subscribe();
  }
  
  public selectThisAccount(selectedAccount:Account,elementIndex:string){
    const card = document.getElementById(`card-${elementIndex}`);
    if(this._selectedAccount == undefined ){
      this._selectedAccount = {...selectedAccount};
     card.classList.add("bg-green-50");
    }else if(selectedAccount.accountNumber == this._selectedAccount.accountNumber){
      this._selectedAccount = {...selectedAccount};
      card.classList.remove('bg-green-50');
    }else if(selectedAccount.accountNumber != this._selectedAccount.accountNumber){
      this._selectedAccount = {...selectedAccount};
      this.accounts$.subscribe({
        next:(res)=>{
          res.forEach((it,index) => {
            const auxCard = document.getElementById(`card-${index}`);
            console.log(auxCard.classList.contains('bg-green-50'));
            auxCard.classList.contains('bg-green-50') ?? auxCard.classList.remove('bg-green-50');
          });
        }
      });
      card.classList.contains('bg-green-50') ? card.classList.remove('bg-green-50') : card.classList.add('bg-green-50') ;
    }

  }
}
