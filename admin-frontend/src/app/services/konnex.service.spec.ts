import { TestBed } from '@angular/core/testing';

import { KonnexService } from './konnex.service';

describe('KonnexService', () => {
  let service: KonnexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KonnexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
