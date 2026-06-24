import { CanActivateFn, Router } from '@angular/router';
import { Auth } from './auth';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  if (auth.loggedIn()) {
    return true;
  } else {
    const router = inject(Router);

    // Delay the navigation by sending a configuration instead.
    // Note that this is the conventional way to use a router in a guard.
    return router.createUrlTree(["/recipes"]);
  }
};
