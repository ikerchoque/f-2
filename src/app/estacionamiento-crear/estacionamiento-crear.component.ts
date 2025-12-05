import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // IMPORTANTE: Para usar [(ngModel)]
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
// Usamos '../' para salir de la carpeta actual
import { EstacionamientoService } from '../servicios/estacionamiento.service';
import { Establecimiento } from '../models/models';

@Component({
  selector: 'app-estacionamiento-crear',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink], 
  templateUrl: './estacionamiento-crear.component.html',
  styleUrls: ['./estacionamiento-crear.component.css']
})
export class EstacionamientoCrearComponent implements OnInit {

  // Modelo inicial vacío
  establecimiento: Establecimiento = {
    identificador: '',
    nombre: '',
    direccion: '',
    capacidad: 0
  };

  esEdicion: boolean = false;
  idEditar: string | null = null;

  constructor(
    private service: EstacionamientoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Verificamos si la URL tiene un ID (ej: /estacionamiento/editar/123)
    this.idEditar = this.route.snapshot.paramMap.get('id');
    
    if (this.idEditar) {
      this.esEdicion = true;
      this.cargarDatosParaEditar(this.idEditar);
    }
  }

  cargarDatosParaEditar(id: string) {
    this.service.getEstablecimientoById(id).subscribe({
      next: (data) => {
        this.establecimiento = data;
      },
      error: (e) => {
        console.error("Error al cargar datos", e);
        alert('Error al cargar el estacionamiento. Revisa la consola.');
      }
    });
  }

  guardar(): void {
    // 1. Verificamos si estamos EDITANDO
    if (this.esEdicion && this.idEditar) {
      this.service.updateEstablecimiento(this.idEditar, this.establecimiento).subscribe({
        next: () => {
          alert('¡Establecimiento actualizado con éxito!');
          this.router.navigate(['/estacionamiento/listar']);
        },
        error: (error) => {
          console.error('Error al actualizar:', error);
          alert('Error al actualizar. Verifica que el servidor Backend esté encendido.');
        }
      });
    } 
    // 2. Si no, estamos CREANDO
    else {
      this.service.createEstablecimiento(this.establecimiento).subscribe({
        next: () => {
          alert('¡Establecimiento creado con éxito!');
          this.router.navigate(['/estacionamiento/listar']);
        },
        error: (error) => {
          console.error('Error al crear:', error);
          alert('Error al guardar. Verifica que el servidor Backend esté encendido y que no estés repitiendo el Identificador.');
        }
      });
    }
  } 
}