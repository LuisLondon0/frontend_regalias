import { TestBed } from '@angular/core/testing';

import { EquipmentsoftwareService } from './equipmentsoftware.service';

describe('EquipmentsoftwareService', () => {
  let service: EquipmentsoftwareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquipmentsoftwareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
