import { TestBed } from '@angular/core/testing';

import { Auth } from './auth';

describe('Auth', () => {
  let service: Auth;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Auth);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have `loggedIn` start as false', () => {
    expect(service.loggedIn()).toBe(false);
  });

  it('should have `loggedIn` be true after calling `login()`', () => {
    service.login();
    expect(service.loggedIn()).toBe(true);
  });

  it('should have `loggedIn` be false after calling `login()` followed by `logout()`', () => {
    service.login();
    service.logout();
    expect(service.loggedIn()).toBe(false);
  });
});
