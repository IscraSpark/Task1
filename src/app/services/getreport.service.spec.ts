import { TestBed } from '@angular/core/testing';

import { GetreportService } from './getreport.service';

describe('GetrepoService', () => {
  let service: GetreportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetreportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
