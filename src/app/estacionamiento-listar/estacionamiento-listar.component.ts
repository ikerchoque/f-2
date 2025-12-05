import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importante para *ngFor
import { RouterLink } from '@angular/router';   // Importante para los botones de navegar
import { EstacionamientoService } from '../servicios/estacionamiento.service'; // Ajusta la ruta si es necesario
import { Establecimiento } from '../models/models';

@Component({
  selector: 'app-estacionamiento-listar',
  standalone: true,
  imports: [CommonModule, RouterLink], // Importamos módulos necesarios aquí
  templateUrl: './estacionamiento-listar.component.html',
  styleUrls: ['./estacionamiento-listar.component.css']
})
export class EstacionamientoListarComponent implements OnInit {

  listaEstablecimientos: Establecimiento[] = [];

  constructor(private service: EstacionamientoService) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos() {
    this.service.getEstablecimientos().subscribe(data => {
      this.listaEstablecimientos = data;
    }, error => {
      console.error('Error al cargar:', error);
    });
  }
}