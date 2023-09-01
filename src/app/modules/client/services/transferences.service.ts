import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Account } from '../Models/Account';
import { Transaction } from '../transferences/Models/Transaction';

@Injectable({
  providedIn: 'root'
})
export class TransferencesService {
  private _baseURL:string = '';
  private _accounts:BehaviorSubject<Account[]>= new BehaviorSubject<Account[]>(null);

  constructor(private _http:HttpClient) {
    this._baseURL = environment.baseURL;
  }
  get accounts$():Observable<Account[]>{
    return this._accounts.asObservable();
  }

  
  public findAccountsByParameter(param:'RUC' | 'CED' | 'PAS' | 'ACC',paramValue:string):Observable<any>{
    return this._http.get(`${this._baseURL}/accounts/account-internalcode/${paramValue}`)
    .pipe(
      tap((response) =>{
        const res = [response];
        this._accounts.next(res);
      })
    );
  }

  public generateTransference(transaction:Transaction,amount:number):Observable<any>{
    return this._http.post(`${this._baseURL}/transactions/transaction`,transaction);
  }
}
