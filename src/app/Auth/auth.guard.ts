import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  const isLoggedIn = !!localStorage.getItem('token') && localStorage.getItem('token')!=null && localStorage.getItem('token')!="";

  if(!isLoggedIn){
    router.navigate(['auth/login']);
    return false;
  }

  return true;
};
