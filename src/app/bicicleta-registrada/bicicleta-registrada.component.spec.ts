import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BicicletaRegistradaComponent } from './bicicleta-registrada.component';

describe('BicicletaRegistradaComponent', () => {
  let component: BicicletaRegistradaComponent;
  let fixture: ComponentFixture<BicicletaRegistradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BicicletaRegistradaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BicicletaRegistradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
