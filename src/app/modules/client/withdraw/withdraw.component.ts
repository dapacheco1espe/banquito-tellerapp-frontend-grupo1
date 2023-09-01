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
import { FuseAlertService } from '@fuse/components/alert';
import { AccountRS } from './Models/AccountRS';
import { WithdrawService } from './withdraw.service';

@Component({
    selector: 'app-withdraw',
    templateUrl: './withdraw.component.html',
    styleUrls: ['./withdraw.component.scss'],
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
    accountDetails: AccountRS;
    amount: number;
    debtor_account: string;

    constructor(
        private withdrawService: WithdrawService,
        private _alertService: FuseAlertService
    ) {}

    realizarRetiro(): void {
        if (
            this.accountDetails &&
            this.amount > 0 &&
            this.amount <= this.saldoTotal
        ) {
            const accountTransactionReqDto = {
                debtorBankCode: 'BANQ',
                debtorAccount: this.accountDetails.codeInternalAccount,
                transactionType: 'WHITDRAWL',
                ammount: this.amount,
                // ... otros campos necesarios
            };
            this.withdrawService
                .realizarRetiro(accountTransactionReqDto)
                .subscribe(
                    (response) => {
                        this.show('alertSuccess');
                        this.retiroExitoso = true;
                        this.saldoTotal -= this.amount;
                    },
                    (error) => {
                        console.error('Error en el retiro:', error);
                        this.retiroExitoso = false;
                    }
                );
        } else {
            console.error(
                'Cuenta inválida, monto incorrecto o saldo insuficiente.'
            );
        }
    }

    public dismiss(name: string): void {
        this._alertService.dismiss(name);
    }

    public show(name: string): void {
        this._alertService.show(name);
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
        this.withdrawService
            .findAccountByInternalCodeAccount(this.accountInternalCode)
            .subscribe(
                (accountDetails) => {
                    if (accountDetails) {
                        this.accountDetails = accountDetails;
                        this.saldoTotal = this.accountDetails.availableBalance;
                        console.log(
                            'Detalles de la cuenta:',
                            this.accountDetails
                        );
                    } else {
                        this.show('alertSearchAccount');
                        this.accountDetails = null;
                    }
                },
                (error) => {
                  this.show('alertSearchAccountHttp');
                    this.accountDetails = null;
                }
            );
    }
}
