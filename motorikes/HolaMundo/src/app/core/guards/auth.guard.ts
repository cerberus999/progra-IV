import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export function authGuard(allowedRoles?: string[]) {
  return () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    if (!auth.isLoggedIn) {
      return router.parseUrl('/login');
    }

    if (allowedRoles && auth.currentUser && !allowedRoles.includes(auth.currentUser.rol)) {
      return router.parseUrl('/');
    }

    return true;
  };
}
