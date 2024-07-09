import { TestBed } from '@angular/core/testing';

import { ParkCodeService } from './park-code.service';

describe('ParkCodeService', () => {
  let service: ParkCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParkCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
