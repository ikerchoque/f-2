import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablecimientoListarBicicletasComponent } from './establecimiento-listar-bicicletas.component';

describe('EstablecimientoListarBicicletasComponent', () => {
  let component: EstablecimientoListarBicicletasComponent;
  let fixture: ComponentFixture<EstablecimientoListarBicicletasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstablecimientoListarBicicletasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstablecimientoListarBicicletasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
