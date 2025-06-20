import { TestBed } from '@angular/core/testing';

import { JuegoAdminService } from './juego-admin.service';

describe('JuegoAdminService', () => {
  let service: JuegoAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JuegoAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
