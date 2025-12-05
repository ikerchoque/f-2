import { Injectable } from '@angular/core';

export type RolUsuario = 'ADMIN' | 'ESTUDIANTE';

export interface UsuarioSesion {
  rut: string;
  rol: RolUsuario;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // 👇 Simulación: cambia 'ESTUDIANTE' por 'ADMIN' para probar
  private usuario: UsuarioSesion = {
    rut: '11111111-1',
    rol: 'ADMIN'
  };

  get usuarioActual(): UsuarioSesion {
    return this.usuario;
  }

  esEstudiante(): boolean {
    return this.usuario.rol === 'ESTUDIANTE';
  }

  esAdmin(): boolean {
    return this.usuario.rol === 'ADMIN';
  }

  // (opcional) para cambiar rol desde consola
  cambiarRol(rol: RolUsuario) {
    this.usuario.rol = rol;
  }
}
