import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// ====== MODELOS SEGÚN LA API ======

export interface EstudianteBicicleta {
  _id: string;
  nombre: string;
  apellido: string;
  rut: string;
  correo?: string;
}

export interface BicicletaPorEstablecimiento {
  _id: string;
  marca: string;
  modelo: string;
  color: string;
  estacionamiento: string;      // Ej: "A1"
  fechaRegistro: string;        // ISO string
  identificador: string;        // _id del establecimiento
  estudiante: EstudianteBicicleta;
}

@Injectable({
  providedIn: 'root',
})
export class BicicletaService {

  // 👇 Base URL sacada del README del profe
  private baseUrl = 'https://backend-registroformulario.onrender.com/api-backend-prueba';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene TODAS las bicicletas de un establecimiento en una fecha dada.
   * Endpoint:
   *   GET /bicicleta/establecimiento/:identificador/fecha/:fecha
   * Ejemplo:
   *   /bicicleta/establecimiento/690d03b8394c53154066b6e0/fecha/2025-12-04
   */
  obtenerPorFecha(
    establecimientoId: string,
    fecha: string
  ): Observable<BicicletaPorEstablecimiento[]> {
    return this.http.get<BicicletaPorEstablecimiento[]>(
      `${this.baseUrl}/bicicleta/establecimiento/${establecimientoId}/fecha/${fecha}`
    );
  }

  /**
   * Usa la fecha de HOY en formato yyyy-mm-dd
   */
  obtenerPorFechaHoy(
    establecimientoId: string
  ): Observable<BicicletaPorEstablecimiento[]> {
    const hoy = new Date().toISOString().slice(0, 10); // "yyyy-mm-dd"
    return this.obtenerPorFecha(establecimientoId, hoy);
  }
}
