import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacationRequestHistoryItemComponent } from './vacation-request-history-item.component';

describe('VacationRequestHistoryItemComponent', () => {
  let component: VacationRequestHistoryItemComponent;
  let fixture: ComponentFixture<VacationRequestHistoryItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VacationRequestHistoryItemComponent]
    });
    fixture = TestBed.createComponent(VacationRequestHistoryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
