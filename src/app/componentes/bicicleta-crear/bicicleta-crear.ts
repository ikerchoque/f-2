import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Estudiante, EstudianteModel } from '../../servicios/estudiante';
import { Bicicleta, BicicletaModel } from '../../servicios/bicicleta';

@Component({
  selector: 'app-bicicleta-crear',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './bicicleta-crear.html',
  styleUrl: './bicicleta-crear.css'
})
export class BicicletaCrear {

  // Inyección de servicios
  private estudianteService = inject(Estudiante);
  private bicicletaService = inject(Bicicleta);

  // Variables de control
  mensaje = '';
  estudianteEncontrado: EstudianteModel | null = null;
  bicicletasDelEstudiante: BicicletaModel[] = [];
  pasoActual: 'buscar' | 'registrarEstudiante' | 'registrarBicicleta' | 'opciones' = 'buscar';
  bicicletaSeleccionada: BicicletaModel | null = null;

  // Formulario para buscar estudiante
  rutForm = new FormGroup({
    rut: new FormControl<string>('', Validators.required)
  });

  // Formulario para registrar estudiante
  estudianteForm = new FormGroup({
    nombre: new FormControl<string>('', Validators.required),
    apellido: new FormControl<string>('', Validators.required),
    rut: new FormControl<string>('', Validators.required),
    correo: new FormControl<string>('', [Validators.required, Validators.email])
  });

  // Formulario para registrar bicicleta
  bicicletaForm = new FormGroup({
    marca: new FormControl<string>('', Validators.required),
    modelo: new FormControl<string>(''),
    color: new FormControl<string>('', Validators.required),
    estacionamiento: new FormControl<string>('', Validators.required)
  });

  // ======================
  //  FLUJO PRINCIPAL
  // ======================

  buscarEstudiante() {
    const rut = this.rutForm.value.rut?.trim();
    if (!rut) return;

    this.estudianteService.buscarPorRut(rut).subscribe({
      next: (estudiante) => {
        this.estudianteEncontrado = estudiante;
        this.mensaje = `✅ Estudiante encontrado: ${estudiante.nombre} ${estudiante.apellido}`;
        this.obtenerBicicletasDeEstudiante(estudiante.rut);
      },
      error: () => {
        this.mensaje = '⚠️ Estudiante no encontrado. Debes registrarlo.';
        this.estudianteEncontrado = null;
        this.estudianteForm.patchValue({ rut });
        this.pasoActual = 'registrarEstudiante';
      }
    });
  }

  registrarEstudiante() {
    if (this.estudianteForm.invalid) {
      this.mensaje = '❌ Completa todos los campos para registrar estudiante.';
      return;
    }

    const nuevoEstudiante = this.estudianteForm.value as EstudianteModel;
    this.estudianteService.crearEstudiante(nuevoEstudiante).subscribe({
      next: (est) => {
        this.estudianteEncontrado = est;
        this.mensaje = '✅ Estudiante registrado correctamente.';
        this.pasoActual = 'registrarBicicleta';
      },
      error: () => (this.mensaje = '❌ Error al registrar estudiante.')
    });
  }

  obtenerBicicletasDeEstudiante(rut: string) {
    this.bicicletaService.getBicicletaPorEstudianteRut(rut).subscribe({
      next: (bicis) => {
        this.bicicletasDelEstudiante = bicis;
        if (bicis.length > 0) {
          this.mensaje = '⚠️ El estudiante ya tiene bicicletas registradas.';
          this.pasoActual = 'opciones';
        } else {
          this.pasoActual = 'registrarBicicleta';
        }
      },
      error: () => {
        this.bicicletasDelEstudiante = [];
        this.pasoActual = 'registrarBicicleta';
      }
    });
  }

  // ======================
  //  SELECCIONAR BICICLETA EXISTENTE
  // ======================

  seleccionarBicicleta(bici: BicicletaModel) {
    this.bicicletaSeleccionada = bici;

    // Mostrar mensaje con contexto
    this.mensaje = `✅ Bicicleta seleccionada: ${bici.marca} - ${bici.color}. 
    Puedes registrar otra o cambiar el estacionamiento.`;

    // Ofrecer directamente la opción de modificar estacionamiento
    this.pasoActual = 'registrarBicicleta';

    // Precargamos los datos de la bici, dejando el campo estacionamiento vacío para que el alumno lo cambie
    this.bicicletaForm.patchValue({
      marca: bici.marca,
      modelo: bici.modelo,
      color: bici.color,
      estacionamiento: ''
    });
  }
  
  // ======================
  //  OPCIONES AL ENCONTRAR BICICLETAS
  // ======================

  registrarNuevaBicicleta() {
    this.bicicletaSeleccionada = null;
    this.bicicletaForm.reset();
    this.pasoActual = 'registrarBicicleta';
  }

  cambiarEstacionamiento(bici: BicicletaModel) {
    this.bicicletaSeleccionada = bici;
    this.bicicletaForm.patchValue({
      marca: bici.marca,
      modelo: bici.modelo,
      color: bici.color,
      estacionamiento: ''
    });
    this.mensaje = `🔄 Cambia el estacionamiento para la bicicleta ${bici.marca} (${bici.color})`;
    this.pasoActual = 'registrarBicicleta';
  }

  // ======================
  //  REGISTRO DE BICICLETA
  // ======================

  registrarBicicleta() {
    if (!this.estudianteEncontrado) {
      this.mensaje = '⚠️ Primero debe existir un estudiante válido.';
      return;
    }
    if (this.bicicletaForm.invalid) {
      this.mensaje = '❌ Completa todos los campos requeridos.';
      return;
    }

    const bicicleta: any = {
      rut: this.estudianteEncontrado.rut,
      ...this.bicicletaForm.value
    };

    this.bicicletaService.registrarBicicleta(bicicleta).subscribe({
      next: () => {
        this.mensaje = '✅ Bicicleta registrada correctamente.';
        this.reiniciarFlujo();
      },
      error: () => (this.mensaje = '❌ Error al registrar bicicleta.')
    });
  }

  reiniciarFlujo() {
    this.bicicletaForm.reset();
    this.rutForm.reset();
    this.estudianteEncontrado = null;
    this.bicicletasDelEstudiante = [];
    this.pasoActual = 'buscar';
  }

}
