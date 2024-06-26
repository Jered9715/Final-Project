import { TestBed } from '@angular/core/testing';

import { NationalParkService } from './national-park.service';

describe('NationalParkService', () => {
  let service: NationalParkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NationalParkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
