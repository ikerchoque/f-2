// src/app/models/estudiante.ts
export interface Estudiante {
  _id?: string;      // opcional cuando se crea
  nombre: string;
  apellido: string;
  rut: string;
  correo: string;
}
