import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FuseAlertService } from '@fuse/components/alert';
import { MovementsService } from './movements.service';
import { Movimiento } from './movimiento.model';

@Component({
    selector: 'app-movements',
    templateUrl: './movements.component.html',
    styleUrls: ['./movements.component.scss'],
})
export class MovementsComponent {
    numeroCuenta: string;
    //movimientos: any[];
    movimientos: Movimiento[];
    mostrarDesglose: boolean;
    formValid: boolean = true;
    errorFecha: string = '';
    public range = new FormGroup({
        start: new FormControl(null),
        end: new FormControl(null),
    });
    constructor(
        private movementsService: MovementsService,
        private _fuseAlertService: FuseAlertService
    ) {}

    realizarConsulta(): void {
        if (!this.range.value.start || !this.range.value.end) {
            this.formValid = false;
            this.errorFecha = 'Por favor, completa todos los campos.';
            return;
        }

        this.movementsService
            .findAccountByInternalCodeAccount(this.numeroCuenta)
            .subscribe({
                next: (response: any) => {
                    const startDate = new Date(this.range.value.start);
                    const endDate = new Date(this.range.value.end);
                    endDate.setDate(endDate.getDate() + 1);
                    this.movementsService
                        .movimientos(
                            response?.uniqueKey,
                            startDate.getTime(),
                            endDate.getTime()
                        )
                        .subscribe({
                            next: (responseMov: any) => {
                                this.movimientos = responseMov;
                                this.mostrarDesglose = true;
                            },
                            error: (error: any) => {
                                this.show('alertMovements');
                            },
                        });
                },
                error: (error: any) => {
                  this.show('alertAccount');
                },
            });
    }

    private calcularSaldoActual(): void {
        let saldoActual = 0;
        for (const movimiento of this.movimientos) {
            saldoActual += movimiento.monto;
            movimiento.saldoActual = saldoActual;
        }
    }

    public dismiss(name: string): void {
        this._fuseAlertService.dismiss(name);
    }

    public show(name: string): void {
        this._fuseAlertService.show(name);
    }
}
