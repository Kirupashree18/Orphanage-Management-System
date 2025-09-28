import { TestBed } from '@angular/core/testing';

import { OrphanService } from './orphan.service';

describe('OrphanService', () => {
  let service: OrphanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrphanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
