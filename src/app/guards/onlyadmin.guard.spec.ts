import { TestBed } from '@angular/core/testing';

import { OnlyAdminGuard } from './onlyadmin.guard';

describe('OnlyadminGuard', () => {
  let guard: OnlyAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OnlyAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
