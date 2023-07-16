import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MovementsService {
  private apiUrl = 'https://api.example.com/movimientos'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) {}

  obtenerMovimientos(fechaInicio: string, fechaFin: string): Observable<any> {
    const params = {
      fechaInicio: fechaInicio,
      fechaFin: fechaFin
    };

    return this.http.get(this.apiUrl, { params: params });
  }
}
