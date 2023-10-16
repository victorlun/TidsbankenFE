import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacationRequestsPage } from './vacation-requests.page';

describe('VacationRequestsPage', () => {
  let component: VacationRequestsPage;
  let fixture: ComponentFixture<VacationRequestsPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VacationRequestsPage]
    });
    fixture = TestBed.createComponent(VacationRequestsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
