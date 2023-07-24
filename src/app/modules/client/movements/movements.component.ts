import { Component } from '@angular/core';
import { MovementsService } from './movements.service';
import { Movimiento } from './movimiento.model';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.scss']
})
export class MovementsComponent {
  fechaInicio: string;
  fechaFin: string;
  //movimientos: any[];
  movimientos: Movimiento[];
  mostrarDesglose: boolean;
  formValid: boolean = true;
  errorFecha: string = '';

  constructor(private movementsService: MovementsService) { }

  realizarConsulta(): void {
    if (!this.fechaInicio || !this.fechaFin) {
      this.formValid = false;
      this.errorFecha = 'Por favor, completa todos los campos.';
      return;
    }


    // Realizar la consulta de movimientos filtrados según las fechas
    this.movimientos = this.movementsService.obtenerMovimientosMock(this.fechaInicio, this.fechaFin);
    this.calcularSaldoActual();
    this.mostrarDesglose = true;
    this.formValid = true;
    this.errorFecha = '';
    
  }

  private calcularSaldoActual(): void {
    let saldoActual = 0;
    for (const movimiento of this.movimientos) {
      saldoActual += movimiento.monto;
      movimiento.saldoActual = saldoActual;
    }
  }
}
