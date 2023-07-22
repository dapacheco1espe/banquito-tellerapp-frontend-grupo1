import { Injectable } from '@angular/core';
import { Movimiento } from './movimiento.model';

@Injectable({
  providedIn: 'root'
})
export class MovementsService {

  obtenerMovimientosMock(fechaInicio: string, fechaFin: string): Movimiento[] {
    // Aquí puedes retornar los datos simulados de mockapi
    const movimientosMock = [
      { id: 1, fecha: '2023-07-20', descripcion: 'Pago de factura de luz', monto: -50 },
      { id: 2, fecha: '2023-07-21', descripcion: 'Depósito de salario', monto: 2000 },
      { id: 3, fecha: '2023-07-22', descripcion: 'Compra en supermercado', monto: -100 },
      // Agrega más datos simulados si es necesario
    ];

    return movimientosMock;
  }

}

