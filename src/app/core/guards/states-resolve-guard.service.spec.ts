import { TestBed } from '@angular/core/testing';

import { StatesResolveGuardService } from './states-resolve-guard.service';

describe('StatesResolveGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatesResolveGuardService = TestBed.get(StatesResolveGuardService);
    expect(service).toBeTruthy();
  });
});
