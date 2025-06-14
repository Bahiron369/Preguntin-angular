import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { blockAuthGuard } from './block-auth.guard';

describe('blockAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => blockAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
