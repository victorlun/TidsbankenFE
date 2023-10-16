import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBlockedPeriodFormComponent } from './create-blocked-period-form.component';

describe('CreateVacationRequestFormComponent', () => {
  let component: CreateBlockedPeriodFormComponent;
  let fixture: ComponentFixture<CreateBlockedPeriodFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateBlockedPeriodFormComponent],
    });
    fixture = TestBed.createComponent(CreateBlockedPeriodFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
