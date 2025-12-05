import { Routes } from '@angular/router';

// --- COMPONENTES ANTIGUOS ---
import { EstudianteCrear } from './componentes/estudiante-crear/estudiante-crear';
import { EstudiantesListar } from './componentes/estudiantes-listar/estudiantes-listar';
import { BuscarPorRut } from './componentes/buscar-por-rut/buscar-por-rut';
import { BuscarBicicletasPorRut } from './componentes/buscar-bicicletas-por-rut/buscar-bicicletas-por-rut';
import { Inicio } from './componentes/inicio/inicio';
import { BicicletaListar } from './componentes/bicicleta-listar/bicicleta-listar';
import { BicicletaCrear } from './componentes/bicicleta-crear/bicicleta-crear';

// --- NUEVOS COMPONENTES ---
import { EstacionamientoListarComponent } from './estacionamiento-listar/estacionamiento-listar.component';
import { EstacionamientoCrearComponent } from './estacionamiento-crear/estacionamiento-crear.component';

import { BicicletaPorEstacionamientoComponent } from './bicicleta-por-estacionamiento/bicicleta-por-estacionamiento.component';
import { BicicletaRegistradaComponent } from './bicicleta-registrada/bicicleta-registrada.component';

export const routes: Routes = [
  { path: '', component: Inicio },
  { path: 'estudiante-crear', component: EstudianteCrear },
  { path: 'estudiante-listar', component: EstudiantesListar },
  { path: 'buscar-por-rut', component: BuscarPorRut },
  { path: 'buscar-bicicleta-por-rut', component: BuscarBicicletasPorRut },
  { path: 'bicicleta-listar', component: BicicletaListar },
  { path: 'bicicleta-crear', component: BicicletaCrear },

  // Estacionamientos
  { path: 'estacionamiento/listar', component: EstacionamientoListarComponent },
  { path: 'estacionamiento/crear', component: EstacionamientoCrearComponent },
  { path: 'estacionamiento/editar/:id', component: EstacionamientoCrearComponent },

  // Registrar bici en un estacionamiento concreto
  { path: 'estacionamiento/bicicletas/:id', component: BicicletaPorEstacionamientoComponent },

  // Confirmación
  { path: 'bicicleta-registrada', component: BicicletaRegistradaComponent },

  // Ruta para QR con query params (opcional)
  { path: 'registrar-bicicleta', component: BicicletaPorEstacionamientoComponent }
];
