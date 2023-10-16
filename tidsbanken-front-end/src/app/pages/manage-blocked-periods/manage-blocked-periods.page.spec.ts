import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageBlockedPeriodsPage } from './manage-blocked-periods.page';

describe('ManageBlockedPeriodsPage', () => {
  let component: ManageBlockedPeriodsPage;
  let fixture: ComponentFixture<ManageBlockedPeriodsPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageBlockedPeriodsPage],
    });
    fixture = TestBed.createComponent(ManageBlockedPeriodsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
