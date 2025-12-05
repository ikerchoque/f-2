import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// ESTA ES LA LÍNEA IMPORTANTE (VA ARRIBA):
import { Establecimiento, Bicicleta } from '../models/models'; 

@Injectable({
  providedIn: 'root'
})
export class EstacionamientoService {

  private apiUrl = 'http://localhost:3000/api'; 

  constructor(private http: HttpClient) { }

  // ... AQUÍ SIGUEN TUS MÉTODOS (getEstablecimientos, create, etc.) ...
  // (Pega aquí el resto de funciones que ya tenías)
  
   getEstablecimientos(): Observable<Establecimiento[]> {
    return this.http.get<Establecimiento[]>(`${this.apiUrl}/establecimiento`);
  }

  createEstablecimiento(datos: Establecimiento): Observable<Establecimiento> {
    return this.http.post<Establecimiento>(`${this.apiUrl}/establecimiento`, datos);
  }

  getEstablecimientoById(id: string): Observable<Establecimiento> {
    return this.http.get<Establecimiento>(`${this.apiUrl}/establecimiento/${id}`);
  }

  updateEstablecimiento(id: string, datos: Establecimiento): Observable<Establecimiento> {
    return this.http.put<Establecimiento>(`${this.apiUrl}/establecimiento/${id}`, datos);
  }

  getBicicletasPorEstacionamiento(identificadorEstablecimiento: string): Observable<Bicicleta[]> {
    return this.http.get<Bicicleta[]>(`${this.apiUrl}/bicicleta/estacionamiento/${identificadorEstablecimiento}`);
  }
}