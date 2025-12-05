import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  BicicletaService,
  BicicletaPorEstablecimiento,
} from '../servicios/bicicleta.service';

@Component({
  selector: 'app-establecimiento-listar-bicicletas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './establecimiento-listar-bicicletas.component.html',
  styleUrls: ['./establecimiento-listar-bicicletas.component.css'],
})
export class EstablecimientoListarBicicletasComponent {
  // ✅ Ahora es string, porque el backend usa _id de Mongo
  establecimientoId: string = '';

  // yyyy-mm-dd
  fechaSeleccionada: string = '';

  // ✅ el backend devuelve un arreglo de bicicletas
  bicicletas: BicicletaPorEstablecimiento[] = [];

  cargando = false;
  error: string | null = null;
  mensajeSinBicicletas: string | null = null;

  constructor(private bicicletaService: BicicletaService) {}

  // ---- GETTER para estudiantes únicos a partir de las bicicletas ----
  get estudiantes() {
    const mapa = new Map<string, BicicletaPorEstablecimiento['estudiante']>();
    for (const bici of this.bicicletas) {
      const est = bici.estudiante;
      if (est && !mapa.has(est._id)) {
        mapa.set(est._id, est);
      }
    }
    return Array.from(mapa.values());
  }

  // ============ BUSCAR POR FECHA SELECCIONADA ============
  buscarPorFecha(): void {
    this.error = null;
    this.mensajeSinBicicletas = null;
    this.bicicletas = [];

    if (!this.establecimientoId || !this.fechaSeleccionada) {
      this.error = 'Debes ingresar un ID de establecimiento y una fecha.';
      return;
    }

    this.cargando = true;

    this.bicicletaService
      .obtenerPorFecha(this.establecimientoId, this.fechaSeleccionada)
      .subscribe({
        next: (resp) => {
          this.cargando = false;
          this.bicicletas = resp || [];

          if (this.bicicletas.length === 0) {
            this.mensajeSinBicicletas =
              'No existen bicicletas registradas para la fecha seleccionada en este establecimiento.';
          }
        },
        error: () => {
          this.cargando = false;
          this.error =
            'Error al obtener la información desde el servidor. Revisa la URL del backend o inténtalo más tarde.';
        },
      });
  }

  // ============ BUSCAR POR FECHA DE HOY ============
  buscarHoy(): void {
    this.error = null;
    this.mensajeSinBicicletas = null;
    this.bicicletas = [];

    if (!this.establecimientoId) {
      this.error = 'Debes ingresar un ID de establecimiento.';
      return;
    }

    this.cargando = true;

    this.bicicletaService
      .obtenerPorFechaHoy(this.establecimientoId)
      .subscribe({
        next: (resp) => {
          this.cargando = false;
          this.bicicletas = resp || [];

          if (this.bicicletas.length === 0) {
            this.mensajeSinBicicletas =
              'Hoy no existen bicicletas registradas para este establecimiento.';
          }
        },
        error: () => {
          this.cargando = false;
          this.error =
            'Error al obtener la información desde el servidor. Revisa la URL del backend o inténtalo más tarde.';
        },
      });
  }
}
