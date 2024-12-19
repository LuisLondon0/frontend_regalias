import { TestBed } from '@angular/core/testing';

import { HumanTalentService } from './human-talent.service';

describe('HumanTalentService', () => {
  let service: HumanTalentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HumanTalentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
