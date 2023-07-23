// import { Component } from '@angular/core';
//import { Transferences } from './transferences.model';
// import { TransferencesService } from './transferences.service';

// @Component({
//   selector: 'app-transferences',
//   templateUrl: './transferences.component.html',
//   styleUrls: ['./transferences.component.scss']
// })
// export class TransferencesComponent {
//   cuentaId: number;
//   monto: number;
//   retiroExitoso: boolean = false;

//   constructor(private transferencesService: TransferencesService) { }

//   realizarRetiro(): void {
//     if (this.cuentaId && this.monto && this.monto > 0) {
//       this.transferencesService.realizarRetiro(this.cuentaId, this.monto).subscribe(
//         () => {
//           // El retiro se realizó con éxito
//           this.retiroExitoso = true;
//         },
//         (error) => {
//           console.error('Error al realizar el retiro:', error);
//           this.retiroExitoso = false;
//         }
//       );
//     } else {
//       // Marcar el retiro como no exitoso si falta información o el monto es inválido
//       this.retiroExitoso = false;
//     }
//   }
// }


import { Component } from '@angular/core';
import { Transferences } from './transferences.model';
import { TransferencesService } from './transferences.service';

@Component({
  selector: 'app-transferences',
  templateUrl: './transferences.component.html',
  styleUrls: ['./transferences.component.scss']
})
export class TransferencesComponent {
  cuentaId: number;
  monto: number;
  transferenciaExitoso: boolean = false;

  // Definir una variable de tipo Transferences
  transference: Transferences;

  constructor(private transferencesService: TransferencesService) { }

  realizarTransferencia(): void {
    if (this.cuentaId && this.monto && this.monto > 0) {
      this.transferencesService.realizarTransferencias(this.cuentaId, this.monto).subscribe(
        () => {
          // El retiro se realizó con éxito
          this.transferenciaExitoso = true;
        },
        (error) => {
          console.error('Error al realizar el retiro:', error);
          this.transferenciaExitoso = false;
        }
      );
    } else {
      // Marcar el retiro como no exitoso si falta información o el monto es inválido
      this.transferenciaExitoso = false;
    }
  }
}
