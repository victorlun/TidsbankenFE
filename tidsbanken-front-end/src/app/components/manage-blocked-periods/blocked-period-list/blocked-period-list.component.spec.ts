import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockedPeriodListComponent } from './blocked-period-list.component';

describe('BlockedPeriodListComponent', () => {
  let component: BlockedPeriodListComponent;
  let fixture: ComponentFixture<BlockedPeriodListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlockedPeriodListComponent],
    });
    fixture = TestBed.createComponent(BlockedPeriodListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
