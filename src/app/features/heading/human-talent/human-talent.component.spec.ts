import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HumanTalentComponent } from './human-talent.component';

describe('HumanTalentComponent', () => {
  let component: HumanTalentComponent;
  let fixture: ComponentFixture<HumanTalentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HumanTalentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HumanTalentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
