import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../servicios/auth.service'; // Ajusta la ruta si es necesario

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, RouterLink],   // RouterLink funciona mejor que RouterModule en standalone
  templateUrl: './inicio.html',
  styleUrls: ['./inicio.css']           // OJO: styleUrls con S
})
export class Inicio {

  constructor(private auth: AuthService) {}

  get esEstudiante(): boolean {
    return this.auth.esEstudiante();
  }

  get esAdmin(): boolean {
    return this.auth.esAdmin();
  }
}
