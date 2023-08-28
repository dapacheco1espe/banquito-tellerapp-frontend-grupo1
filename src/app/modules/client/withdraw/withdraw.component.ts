// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-withdraw',
//   templateUrl: './withdraw.component.html',
//   styleUrls: ['./withdraw.component.scss']
// })
// export class WithdrawComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }


import { Component } from '@angular/core';
import { WithdrawService } from './withdraw.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent {
  cuentaId: number;
  monto: number;
  retiroExitoso: boolean = false;
  mostrarMensaje: boolean = false; // Agrega la variable retiroIntentado
  saldoTotal: number = 1000; // Saldo total de la cuenta (datos quemados para este ejemplo)
  saldoRestante: number;
  cuentaEncontrada: any;
  accountInternalCode: string;
  accountDetails: any;
  amount: number;


  constructor(private withdrawService: WithdrawService, private http: HttpClient ) { }

  realizarRetiro(): void {
    if (this.accountDetails && this.amount > 0 && this.amount <= this.saldoTotal) {
      const accountTransactionReqDto = {
        debtorAccount: this.accountInternalCode,
        creditorAccount: 'YOUR_BANK_CODE', // Cambia esto por el código de tu banco
        transactionType: 'TRANSFER',
        ammount: this.amount,
        // ... otros campos necesarios
      };

      this.withdrawService.realizarRetiro(accountTransactionReqDto).subscribe(
        response => {
          console.log('Retiro exitoso:', response);
          this.retiroExitoso = true;
          this.saldoTotal -= this.amount;
        },
        error => {
          console.error('Error en el retiro:', error);
          this.retiroExitoso = false;
        }
      );
    } else {
      console.error('Cuenta inválida, monto incorrecto o saldo insuficiente.');
    }
  }
  



  // buscarCuenta() {
  //   this.accountService.findAccountByAccountUK(this.cuentaId.toString())
  //     .subscribe((cuentaEncontrada: any) => {
  //       this.cuentaEncontrada = cuentaEncontrada;
  //       if (this.cuentaEncontrada) {
  //         console.log('Cuenta encontrada:', this.cuentaEncontrada);
  //       } else {
  //         console.log('Cuenta no encontrada.');
  //       }
  //     }, error => {
  //       console.error('Error al buscar cuenta:', error);
  //     });
  // }

  buscarCuentaPorInternalCode() {
    this.withdrawService.findAccountByInternalCodeAccount(this.accountInternalCode)
      .subscribe(accountDetails => {
        if (accountDetails) {
          this.accountDetails = accountDetails;
          console.log('Detalles de la cuenta:', this.accountDetails);
        } else {
          console.log('Cuenta no encontrada o falta la propiedad accountInternalCode.');
          this.accountDetails = null;
        }
      }, error => {
        console.error('Error al buscar la cuenta:', error);
        this.accountDetails = null;
      });
  }
}
      
     



