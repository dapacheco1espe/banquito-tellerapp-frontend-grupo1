import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Account } from '../Models/Account';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  private _baseURL:string = '';
  private _account:BehaviorSubject<Account>= new BehaviorSubject<Account>(null);

  get accounts$():Observable<Account>{
    return this._account.asObservable();
  }

  set accountValue(account:Account){
    this._account.next(account);
  }
  constructor(private _http:HttpClient) {
    this._baseURL = environment.baseURL;
  }

  public findBalanceByAccountNumber(accountNumber:string | number):Observable<any>{
    return this._http.get(`${this._baseURL}/accounts/accounts-client/${accountNumber}`,{
      params:{
        accountNumber: accountNumber,
      }
    })
    .pipe(
      tap((response)=>{
        this._account.next(response[0]);
      })
    );
  }
}
