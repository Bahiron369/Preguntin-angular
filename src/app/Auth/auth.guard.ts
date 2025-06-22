import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

//este guardia comprueba que el usuario este registrado, de lo contrario retorna al login
export const authGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  const isLoggedIn = !!localStorage.getItem('token') && localStorage.getItem('token')!=null && localStorage.getItem('token')!="";

  if(!isLoggedIn){
    router.navigate(['auth/login']);
    return false;
  }

  return true;
};
