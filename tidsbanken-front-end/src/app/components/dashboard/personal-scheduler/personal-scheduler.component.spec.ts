import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalSchedulerComponent } from './personal-scheduler.component';

describe('PersonalSchedulerComponent', () => {
  let component: PersonalSchedulerComponent;
  let fixture: ComponentFixture<PersonalSchedulerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonalSchedulerComponent]
    });
    fixture = TestBed.createComponent(PersonalSchedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
