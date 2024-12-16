import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentsoftwareComponent } from './equipmentsoftware.component';

describe('EquipmentsoftwareComponent', () => {
  let component: EquipmentsoftwareComponent;
  let fixture: ComponentFixture<EquipmentsoftwareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipmentsoftwareComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentsoftwareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
