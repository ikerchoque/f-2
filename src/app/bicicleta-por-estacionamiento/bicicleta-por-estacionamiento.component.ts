import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EstacionamientoService } from '../servicios/estacionamiento.service';
import { Bicicleta as BicicletaService } from '../servicios/bicicleta'; // servicio de bicicleta
import { AuthService } from '../servicios/auth.service';               // para saber rut y rol

@Component({
  selector: 'app-bicicleta-por-estacionamiento',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './bicicleta-por-estacionamiento.component.html',
  styleUrls: ['./bicicleta-por-estacionamiento.component.css']
})
export class BicicletaPorEstacionamientoComponent implements OnInit {

  // lista de bicis del estacionamiento (no nos interesa el tipo exacto)
  listaBicicletas: any[] = [];

  form!: FormGroup;
  estacionamientoId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private estacionamientoService: EstacionamientoService,
    private bicicletaService: BicicletaService,
    private authService: AuthService,      // 👈 usamos el usuario actual
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // 1) Crear formulario
    this.form = this.fb.group({
      identificador: ['', Validators.required],   // viene del QR (solo visual)
      estacionamiento: ['', Validators.required],
      rut: ['', Validators.required],
      marca: ['', Validators.required],
      modelo: [''],
      color: ['', Validators.required],
    });

    // 2) Tomar :id del estacionamiento desde la ruta
    this.estacionamientoId = this.route.snapshot.paramMap.get('id');

    if (this.estacionamientoId) {
      this.form.patchValue({ estacionamiento: this.estacionamientoId });
      this.form.get('estacionamiento')?.disable();

      // cargar bicis ya registradas en este estacionamiento
      this.estacionamientoService
        .getBicicletasPorEstacionamiento(this.estacionamientoId)
        .subscribe(
          (data: any[]) => this.listaBicicletas = data,
          (err: any) => console.error('Error al cargar bicicletas', err)
        );
    }

    // 3) Leer identificador desde query params (QR)
    this.route.queryParamMap.subscribe(params => {
      const identificador = params.get('identificador');
      if (identificador) {
        this.form.patchValue({ identificador });
        this.form.get('identificador')?.disable();
      }
    });

    // 4) BONUS: autocompletar datos si el estudiante tiene una sola bicicleta
    this.autocompletarSiTieneUnaBici();
  }

  // BONUS: si el estudiante tiene solo una bici, rellenar marca/modelo/color
  private autocompletarSiTieneUnaBici(): void {
    const rut = this.authService.usuarioActual.rut;

    // rellenamos el rut en el formulario también
    this.form.patchValue({ rut });

    this.bicicletaService.getBicicletaPorEstudianteRut(rut).subscribe(
      (bicis: any[]) => {
        if (bicis.length === 1) {
          const b = bicis[0];

          // rellenamos los campos de la bici
          this.form.patchValue({
            marca: b.marca,
            modelo: b.modelo,
            color: b.color
          });

          // los bloqueamos para que no los cambie
          this.form.get('marca')?.disable();
          this.form.get('modelo')?.disable();
          this.form.get('color')?.disable();
        }
        // si tiene 0 o más de una bici, no hacemos nada
      },
      (err: any) => {
        console.error('Error al obtener bicicletas del estudiante', err);
      }
    );
  }

  // registrar bici (como antes)
  registrarBici(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue(); // incluye disabled

    const data = {
      rut: raw.rut,
      marca: raw.marca,
      modelo: raw.modelo,
      color: raw.color,
      estacionamiento: raw.estacionamiento
    };

    this.bicicletaService.registrarBicicleta(data).subscribe({
      next: (bicicletaCreada: any) => {
        this.router.navigate(['/bicicleta-registrada'], {
          state: { bicicleta: bicicletaCreada }
        });
      },
      error: (err: any) => {
        console.error('Error al registrar bicicleta', err);
      }
    });
  }
}
