import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageVacationRequestsPage } from './manage-vacation-requests.page';

describe('ManageVacationRequestsPage', () => {
  let component: ManageVacationRequestsPage;
  let fixture: ComponentFixture<ManageVacationRequestsPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageVacationRequestsPage]
    });
    fixture = TestBed.createComponent(ManageVacationRequestsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
