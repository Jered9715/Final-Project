import { TestBed } from '@angular/core/testing';

import { ParkVisitHistoryService } from './park-visit-history.service';

describe('ParkVisitHistoryService', () => {
  let service: ParkVisitHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParkVisitHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
