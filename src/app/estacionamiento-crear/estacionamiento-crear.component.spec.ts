import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstacionamientoCrearComponent } from './estacionamiento-crear.component';

describe('EstacionamientoCrearComponent', () => {
  let component: EstacionamientoCrearComponent;
  let fixture: ComponentFixture<EstacionamientoCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstacionamientoCrearComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstacionamientoCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
