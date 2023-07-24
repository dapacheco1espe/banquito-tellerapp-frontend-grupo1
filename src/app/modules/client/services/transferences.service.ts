import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Account } from '../Models/Account';

@Injectable({
  providedIn: 'root'
})
export class TransferencesService {
  private _baseURL:string = '';
  private _accounts:BehaviorSubject<Account[]>= new BehaviorSubject<Account[]>(null);

  constructor(private _http:HttpClient) { }
  get accounts$():Observable<Account[]>{
    return this._accounts.asObservable();
  }

  
  public findAccountsByParameter(param:'RUC' | 'CED' | 'PAS' | 'ACC',paramValue:string):Observable<any>{
    return this._http.post(`api/v1/account`,{
      paramValue:param,
      value:paramValue,
    })
    .pipe(
      tap((response) =>{
        this._accounts.next(response);
      })
    );
  }
}
