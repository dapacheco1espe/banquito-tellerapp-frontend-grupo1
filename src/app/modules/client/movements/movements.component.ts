import { Component } from '@angular/core';
import { MovementsService } from './movements.service';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.scss']
})
export class MovementsComponent {
  fechaInicio: string;
  fechaFin: string;
  movimientos: any[];
  mostrarDesglose: boolean;

  constructor(private movementsService: MovementsService) { }

  realizarConsulta(): void {
    if (this.fechaInicio && this.fechaFin) {
      this.movimientos = []; // Reiniciar la lista de movimientos
      this.mostrarDesglose = false; // Ocultar el formulario de desglose

      // Verificar que las fechas de inicio y fin están presentes
      if (this.fechaInicio && this.fechaFin) {
        this.movementsService.obtenerMovimientos(this.fechaInicio, this.fechaFin).subscribe(
          (response) => {
            this.movimientos = response;
            this.mostrarDesglose = true; // Mostrar el formulario de desglose
          },
          (error) => {
            console.error(error);
          }
        );
      }
    }
  }


}
