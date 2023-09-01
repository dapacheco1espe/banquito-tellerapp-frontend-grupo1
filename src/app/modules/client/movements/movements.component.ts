import { Component } from '@angular/core';
import { MovementsService } from './movements.service';
import { Movimiento } from './movimiento.model';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.scss']
})
export class MovementsComponent {
  numeroCuenta: string; 
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
  
    this.movementsService.findAccountByInternalCodeAccount(this.numeroCuenta).subscribe({
      next: (response: any) => {
        this.movementsService.movimientos(response?.uniqueKey).subscribe({
          next: (responseMov: any) => {
            this.movimientos = responseMov; 
            this.mostrarDesglose = true; 
          },
          error: (error: any) => {
            console.error('Error al obtener movimientos:', error);
          }
        });
      },
      error: (error: any) => {
        console.error('Error al encontrar la cuenta:', error);
      }
    });
  }
  

  private calcularSaldoActual(): void {
    let saldoActual = 0;
    for (const movimiento of this.movimientos) {
      saldoActual += movimiento.monto;
      movimiento.saldoActual = saldoActual;
    }
  }
}
