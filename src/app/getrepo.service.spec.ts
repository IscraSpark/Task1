import { TestBed } from '@angular/core/testing';

import { GetrepoService } from './getrepo.service';

describe('GetrepoService', () => {
  let service: GetrepoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetrepoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
