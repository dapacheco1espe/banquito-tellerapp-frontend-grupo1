import { Component } from '@angular/core';
import { Retiro } from './retiro.model';
import { RetiroService } from './retiro.service';

@Component({
  selector: 'app-retiro',
  templateUrl: './retiro.component.html',
  styleUrls: ['./retiro.component.scss']
})
export class RetiroComponent {
  cuentaId: number;
  monto: number;
  retiroExitoso: boolean = false;

  constructor(private retiroService: RetiroService) { }

  realizarRetiro(): void {
    if (this.cuentaId && this.monto && this.monto > 0) {
      this.retiroService.realizarRetiro(this.cuentaId, this.monto).subscribe(
        () => {
          // El retiro se realizó con éxito
          this.retiroExitoso = true;
        },
        (error) => {
          console.error('Error al realizar el retiro:', error);
          this.retiroExitoso = false;
        }
      );
    } else {
      // Marcar el retiro como no exitoso si falta información o el monto es inválido
      this.retiroExitoso = false;
    }
  }
}
