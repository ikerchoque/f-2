import { Injectable, inject  } from '@angular/core';
//Nuevo agregado
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BicicletaModel {
  _id?: string;
  marca: string;
  modelo: string;
  color: string;
  estacionamiento: string;
  fechaRegistro: Date;
}

@Injectable({
  providedIn: 'root'
})
export class Bicicleta {
  
  private apiUrl = 'https://backend-registroformulario.onrender.com/api-backend-prueba/bicicleta'; //Esta es la ruta del backend y /estudiante es el servicio disponible especialmente para estudiante. Ver documentación
  private http = inject(HttpClient);

  getBicicletaPorEstudianteRut(rut:string): Observable<BicicletaModel[]> {
    return this.http.get<BicicletaModel[]>(`${this.apiUrl}/estudiante/${rut}`);
  }

  /** 🔹 Registrar una nueva bicicleta (por RUT de estudiante) */
  registrarBicicleta(data: {
    rut: string;
    marca: string;
    modelo?: string;
    color: string;
    estacionamiento: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/registrar`, data);
  }

  /** Listar todas las bicicletas */

  listarBicicletas(): Observable<BicicletaModel[]> {
    return this.http.get<BicicletaModel[]>(`${this.apiUrl}/listar`);
  }

  /**  Eliminar bicicleta por ID */

  eliminarBicicleta(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
