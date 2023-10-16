import { TestBed } from '@angular/core/testing';

import { BlockedPeriodService } from './blocked-period.service';

describe('BlockedPeriodService', () => {
  let service: BlockedPeriodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlockedPeriodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
