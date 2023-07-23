// retiro.service.ts
import { Injectable } from '@angular/core';
import { Transferences } from './transferences.model';
import { Observable, of } from 'rxjs'; // Importa 'of' desde rxjs

@Injectable({
  providedIn: 'root'
})
export class TransferencesService {
  private transferencia: Transferences[] = []; // Array para almacenar los retiros

  constructor() { }

  obtenerTransferencias(): Transferences[] {
    this.transferencia = [
      { cuentaId: 1, monto: 50 },
      { cuentaId: 2, monto: 100 },
      { cuentaId: 1, monto: 200 }
    ];

    return this.transferencia;
  }

  realizarTransferencias(cuentaId: number, monto: number): Observable<any> {
    // Aquí puedes realizar la lógica para hacer el retiro
    // Por ejemplo, podrías buscar la cuenta en la lista de retiros y restar el monto

    const transferenciaRealizado: Transferences = { cuentaId, monto };
    this.transferencia.push(transferenciaRealizado); // Agregar el retiro a la lista de retiros simulados

    // Simulamos una respuesta exitosa usando el operador 'of' de RxJS
    return of({ success: true });
  }

  //obtenerRetiros(): Retiro[] {
    // Retorna una copia de la lista de retiros simulados
    //return [...this.retiros];
  //}
}
