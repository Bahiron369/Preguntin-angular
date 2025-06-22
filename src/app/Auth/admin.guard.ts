import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

// este guarda de ruto lo que procesa es lo siguiente
export const adminGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  let serviceAuth = inject(AuthService);

  //1. que el usario este registrado
  const isLoggedIn = !!localStorage.getItem('token') && localStorage.getItem('token')!=null && localStorage.getItem('token')!="";

  //si no esta registrado que navege hacia el login
  if(!isLoggedIn){
    router.navigate(['auth/login']);
    return false;
  }

  //2. comprobar que tenga el rol del administrador 
  return serviceAuth.IsAdmin();
};
