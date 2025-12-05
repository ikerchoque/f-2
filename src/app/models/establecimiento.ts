// src/app/models/establecimiento.ts
export interface Establecimiento {
  _id?: string;
  identificador: string; // código del estacionamiento
  nombre: string;
  direccion: string;
  capacidad: number;
  fechaRegistro?: string;
}
