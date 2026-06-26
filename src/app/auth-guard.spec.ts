import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authGuard } from './auth-guard';
import { Auth } from './auth';
import { inject } from '@angular/core';

describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should return `true` if logged in', () => {
    const result = TestBed.runInInjectionContext(
      () => {
        const service = inject(Auth);
        service.login();
        return authGuard({} as any, {} as any)
      }
    );

    expect(result).toBe(true);
  });

  it('should redirect to `/recipes` when not logged in', () => {
    const result = TestBed.runInInjectionContext(
      () => authGuard({} as any, {} as any)
    );

    expect(result.toString()).toBe('/recipes');
  });
});
