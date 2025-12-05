import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bicicleta-registrada',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bicicleta-registrada.component.html',
  styleUrls: ['./bicicleta-registrada.component.css']
})
export class BicicletaRegistradaComponent implements OnInit {

  // usamos any para no pelearnos con tipos distintos del backend
  bicicleta: any = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const nav = this.router.getCurrentNavigation();
    this.bicicleta = nav?.extras.state?.['bicicleta'];

    // Si alguien entra directo a la URL sin venir del registro
    if (!this.bicicleta) {
      this.router.navigate(['/']);
    }
  }

  volverInicio(): void {
    this.router.navigate(['/']);
  }
}
