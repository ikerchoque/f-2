import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Ajusta estos modelos a los que tengas en ../models/models
import { Establecimiento, Bicicleta } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class EstacionamientoService {

  // 👇 Mismo backend de la documentación
  private apiUrl = 'https://backend-registroformulario.onrender.com/api-backend-prueba';

  constructor(private http: HttpClient) { }

  // LISTAR ESTABLECIMIENTOS
  // GET /establecimiento/listar
  getEstablecimientos(): Observable<Establecimiento[]> {
    return this.http.get<Establecimiento[]>(`${this.apiUrl}/establecimiento/listar`);
  }

  // CREAR ESTABLECIMIENTO
  // POST /establecimiento/crear
  createEstablecimiento(datos: Establecimiento): Observable<Establecimiento> {
    return this.http.post<Establecimiento>(`${this.apiUrl}/establecimiento/crear`, datos);
  }

  // OBTENER ESTABLECIMIENTO POR ID
  // GET /establecimiento/:id
  getEstablecimientoById(id: string): Observable<Establecimiento> {
    return this.http.get<Establecimiento>(`${this.apiUrl}/establecimiento/${id}`);
  }

  // ACTUALIZAR ESTABLECIMIENTO POR ID
  // PUT /establecimiento/actualizar/:id
  updateEstablecimiento(id: string, datos: Establecimiento): Observable<Establecimiento> {
    return this.http.put<Establecimiento>(`${this.apiUrl}/establecimiento/actualizar/${id}`, datos);
  }

  // LISTAR BICICLETAS POR ESTABLECIMIENTO (SIN FECHA)
  // GET /bicicleta/establecimiento/:identificador
  getBicicletasPorEstacionamiento(identificadorEstablecimiento: string): Observable<Bicicleta[]> {
    return this.http.get<Bicicleta[]>(`${this.apiUrl}/bicicleta/establecimiento/${identificadorEstablecimiento}`);
  }
}
