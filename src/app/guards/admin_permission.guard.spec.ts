import { TestBed } from '@angular/core/testing';

import { AdminPermissionGuard } from './admin_permission.guard';

describe('OnlyadminGuard', () => {
  let guard: AdminPermissionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminPermissionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
