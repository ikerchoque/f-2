import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LedControl } from './led-control';

describe('LedControl', () => {
  let component: LedControl;
  let fixture: ComponentFixture<LedControl>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LedControl]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LedControl);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
