export interface Establecimiento {
  _id?: string;           // El ID que genera la base de datos (opcional al crear)
  identificador: string;
  nombre: string;
  direccion: string;
  capacidad: number;
  fechaRegistro?: Date;
}


export interface Bicicleta {
  _id?: string;
  rut: string;            // Rut del estudiante dueño
  marca: string;
  modelo: string;
  color: string;
  estacionamiento: string; // Nombre o ID del estacionamiento actual
  identificador: string;   // El identificador del establecimiento donde está
  fechaRegistro?: Date;
}
