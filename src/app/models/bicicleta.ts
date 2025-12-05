// src/app/models/bicicleta.ts
export interface Bicicleta {
  _id?: string;
  rut: string;              // rut del estudiante
  marca: string;
  modelo: string;
  color: string;
  estacionamiento: string;  // nombre o código del estacionamiento
  fechaRegistro?: string;
  identificador: string;    // identificador del establecimiento
}
