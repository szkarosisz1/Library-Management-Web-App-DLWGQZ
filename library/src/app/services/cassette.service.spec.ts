import { TestBed } from '@angular/core/testing';

import { CassetteService } from './cassette.service';

describe('CassetteService', () => {
  let service: CassetteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CassetteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
