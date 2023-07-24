import { Injectable } from '@angular/core';
import { Movimiento } from './movimiento.model';

@Injectable({
  providedIn: 'root'
})
export class MovementsService {

  obtenerMovimientosMock(fechaInicio: string, fechaFin: string): Movimiento[] {
    // Aquí puedes retornar los datos simulados de mockapi
    const movimientosMock = [
      { id: 1, fecha: '2023-07-20', descripcion: 'Depósito arriendo casa', monto: 200 },
      { id: 2, fecha: '2023-07-21', descripcion: 'Pago de factura de luz', monto: -150 },
      { id: 3, fecha: '2023-07-22', descripcion: 'Depósito de salario', monto: 2000 },
      { id: 4, fecha: '2023-07-23', descripcion: 'Compra en supermercado', monto: -100 },
      // Agrega más datos simulados si es necesario
    ];

    // Calcular el saldo total
    let saldoTotal = 0;
    for (const movimiento of movimientosMock) {
      saldoTotal += movimiento.monto;
    }

    // Filtrar los movimientos según las fechas de inicio y fin
    const movimientosFiltrados: Movimiento[] = [];
    let saldoActual = saldoTotal;

    for (const movimiento of movimientosMock) {
      if (movimiento.fecha >= fechaInicio && movimiento.fecha <= fechaFin) {
        saldoActual -= movimiento.monto;
        const movimientoConSaldo: Movimiento = {
          ...movimiento,
          saldoActual: saldoActual
        };
        movimientosFiltrados.push(movimientoConSaldo);
      }
    }

    return movimientosFiltrados;
  }

}
