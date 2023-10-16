import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVacationRequestFormComponent } from './create-vacation-request-form.component';

describe('CreateVacationRequestFormComponent', () => {
  let component: CreateVacationRequestFormComponent;
  let fixture: ComponentFixture<CreateVacationRequestFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateVacationRequestFormComponent]
    });
    fixture = TestBed.createComponent(CreateVacationRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
