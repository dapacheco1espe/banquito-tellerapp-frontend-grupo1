// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class WithdrawService {

//   constructor() { }

//   realizarRetiro(cuentaId: number, monto: number): boolean {
//     // Simulación de retiro exitoso con datos quemados
//     const retiroExitoso = true;

//     if (retiroExitoso) {
//       // Aquí puedes realizar la lógica para hacer el retiro
//       // Por ejemplo, podrías buscar la cuenta en la base de datos y restar el monto

//       return true; // Retorno exitoso
//     } else {
//       return false; // Retorno de error
//     }
//   }
// }

import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class WithdrawService {
  // private baseURL: string =''

  // constructor(private _http:HttpClient){
  //   this.baseURL=environment.baseURL
  // }

  // public getRetiro():Observable <any> {
  //   return this._http.get(`${this.baseURL}/url postman`)
  // }}

  private apiUrl = 'http://localhost:9050/api/v1/accounts';
  constructor(private http: HttpClient) {
    this.apiUrl = environment.baseURL;
  }

  findAccountByInternalCodeAccount(accountInternalCode: string) {
    return this.http.get(`${this.apiUrl}/accounts/account-internalcode/${accountInternalCode}`);
  }



  private cuentasBancarias: any[] = [
    { id: 1, saldo: 1000 },
    { id: 2, saldo: 1500 },
    // Agrega más cuentas si es necesario
  ];

  //constructor() { }

  // Método para realizar un retiro
  realizarRetiro(accountTransactionReqDto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/transactions/transaction`, accountTransactionReqDto);
  }



  buscarCuentaPorId(cuentaId: number): any {
    return this.cuentasBancarias.find(cuenta => cuenta.id === cuentaId);
  }
}


