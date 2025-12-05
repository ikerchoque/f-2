import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstacionamientoListarComponent } from './estacionamiento-listar.component';

describe('EstacionamientoListarComponent', () => {
  let component: EstacionamientoListarComponent;
  let fixture: ComponentFixture<EstacionamientoListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstacionamientoListarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstacionamientoListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
