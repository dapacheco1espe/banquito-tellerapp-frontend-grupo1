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

  constructor(private movementsService: MovementsService) { }

  realizarConsulta(): void {
    if (this.fechaInicio && this.fechaFin) {
      this.movimientos = []; // Reiniciar la lista de movimientos
      this.mostrarDesglose = false; // Ocultar el formulario de desglose

      // Obtener los movimientos simulados del servicio
      this.movimientos = this.movementsService.obtenerMovimientosMock(this.fechaInicio, this.fechaFin);
      this.mostrarDesglose = true; // Mostrar el formulario de desglose
    }
  }
}
