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

  constructor(private withdrawService: WithdrawService) { }

  realizarRetiro(): void {

    if (this.cuentaId && this.monto && this.monto > 0 && this.monto <= this.saldoTotal) {
      if (this.monto <= this.saldoTotal) {
        // Realizar aquí la lógica para hacer el retiro
        this.saldoTotal -= this.monto;
        this.saldoRestante = this.saldoTotal;
        this.retiroExitoso = true;
        // Simulamos el retiro exitoso
        this.mostrarMensaje = true;
      } else {
        // Saldo insuficiente para el retiro, vaciar los datos de las tablas
        this.retiroExitoso = false;
        this.mostrarMensaje = true;
        this.cuentaId = null;
        this.monto = null;
      }
    } else {
      // Marcar el retiro como no exitoso si falta información o el monto es inválido
      this.retiroExitoso = false;
      this.mostrarMensaje = false;
    }
  }
}
      
     



