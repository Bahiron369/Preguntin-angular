import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const blockAuthGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  const isLoggedIn = !!localStorage.getItem('token');

  if(isLoggedIn){
    router.navigate(['/dashboard']);
    return false;
  }

  return true;
};
