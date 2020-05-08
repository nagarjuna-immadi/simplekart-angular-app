import { TestBed } from '@angular/core/testing';

import { AuthTokenIntercepterService } from './auth-token-intercepter.service';

describe('AuthTokenIntercepterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthTokenIntercepterService = TestBed.get(AuthTokenIntercepterService);
    expect(service).toBeTruthy();
  });
});
