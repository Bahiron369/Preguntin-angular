import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

//este guarda evita que los usuarios ya logeados entren a link publicos 
export const blockAuthGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  const isLoggedIn = !!localStorage.getItem('token');

  if(isLoggedIn){
    router.navigate(['/dashboard']);
    return false;
  }

  return true;
};
