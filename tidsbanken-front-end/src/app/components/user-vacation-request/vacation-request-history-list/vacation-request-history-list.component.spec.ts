import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacationRequestHistoryListComponent } from './vacation-request-history-list.component';

describe('VacationRequestHistoryListComponent', () => {
  let component: VacationRequestHistoryListComponent;
  let fixture: ComponentFixture<VacationRequestHistoryListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VacationRequestHistoryListComponent]
    });
    fixture = TestBed.createComponent(VacationRequestHistoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
