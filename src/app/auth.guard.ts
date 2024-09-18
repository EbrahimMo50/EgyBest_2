import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const _authService = inject(AuthService);
  const router = inject(Router);

  if (_authService.token) {
    return true; // User is logged in and has a token
  } 

  else {
    router.navigate(['/login']); 
    return false; 
  }
};
