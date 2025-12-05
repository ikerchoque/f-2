import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BicicletaPorEstacionamientoComponent } from './bicicleta-por-estacionamiento.component';

describe('BicicletaPorEstacionamientoComponent', () => {
  let component: BicicletaPorEstacionamientoComponent;
  let fixture: ComponentFixture<BicicletaPorEstacionamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BicicletaPorEstacionamientoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BicicletaPorEstacionamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
