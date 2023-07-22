// retiro.service.ts
import { Injectable } from '@angular/core';
import { Retiro } from './retiro.model';
import { Observable, of } from 'rxjs'; // Importa 'of' desde rxjs

@Injectable({
  providedIn: 'root'
})
export class RetiroService {
  private retiros: Retiro[] = []; // Array para almacenar los retiros

  constructor() { }

  obtenerRetiros(): Retiro[] {
    // Simulación de datos quemados de retiros
    this.retiros = [
      { cuentaId: 1, monto: 50 },
      { cuentaId: 2, monto: 100 },
      { cuentaId: 1, monto: 200 }
      // Agrega más datos simulados si es necesario
    ];

    return this.retiros;
  }

  realizarRetiro(cuentaId: number, monto: number): Observable<any> {
    // Aquí puedes realizar la lógica para hacer el retiro
    // Por ejemplo, podrías buscar la cuenta en la lista de retiros y restar el monto

    const retiroRealizado: Retiro = { cuentaId, monto };
    this.retiros.push(retiroRealizado); // Agregar el retiro a la lista de retiros simulados

    // Simulamos una respuesta exitosa usando el operador 'of' de RxJS
    return of({ success: true });
  }

  //obtenerRetiros(): Retiro[] {
    // Retorna una copia de la lista de retiros simulados
    //return [...this.retiros];
  //}
}
