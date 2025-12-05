import { Component, inject } from '@angular/core';
import { Estudiante, EstudianteModel } from '../../servicios/estudiante';
import { FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-estudiante-crear',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './estudiante-crear.html',
  styleUrls: ['./estudiante-crear.css']   // 👈 AQUÍ en plural y array
})
export class EstudianteCrear {
  // Instanciamos el servicio
  private estudianteService = inject(Estudiante);

  mensaje = '';

  // Formulario reactivo
  estudianteForm = new FormGroup({
    nombre: new FormControl<string>('', Validators.required),
    apellido: new FormControl<string>('', Validators.required),
    rut: new FormControl<string>(''),
    correo: new FormControl<string>('', [Validators.required, Validators.email])
  });

  crearEstudiante() {
    if (this.estudianteForm.invalid) {
      this.mensaje = '❌ Por favor completa los campos obligatorios';
      return;
    }

    const estudiante: EstudianteModel = {
      nombre: this.estudianteForm.get('nombre')!.value || '',
      apellido: this.estudianteForm.get('apellido')!.value || '',
      rut: this.estudianteForm.get('rut')!.value || '',
      correo: this.estudianteForm.get('correo')!.value || ''
    };

    this.estudianteService.crearEstudiante(estudiante).subscribe({
      next: () => {
        this.mensaje = '✅ Estudiante creado correctamente';
        this.estudianteForm.reset();
      },
      error: () => (this.mensaje = '❌ Error al crear estudiante')
    });
  }
}
