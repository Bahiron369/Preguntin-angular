import { Injectable } from '@angular/core';
import {  Router } from '@angular/router';
import { Observable } from 'rxjs';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})

//este servido proviciona informacion del estado del usuario, como el registr, el login y otras cosas
export class AuthService {

  constructor(private route:Router) { }

  //envia si el usario es autentidado o no
  UsuarioAutenticado():Observable<boolean>{
      let usuario = localStorage.getItem('token');

      //observable personalizado
      let estadoUsuario = new Observable<boolean>((observer)=>{
        usuario==null ? observer.next(false) : observer.next(true)
      });

      return  estadoUsuario;
  }

  //cuando se cierra la sesion, se borra el token
  cerraSesion(){
    localStorage.removeItem('token')
    this.route.navigate(['/'])
  }

  //obtiene la informacion del usuario mediante el token
  getInforUsuario():any{
    let token = localStorage.getItem('token')

    if(token!=null && token != ""){
      return jwtDecode(token)
    }else{
      return null;
    }
  }

  //comprueba si el usario es admin por medio del token
  IsAdmin():boolean{
    const usuario = this.getInforUsuario();
    const roles = usuario['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    if(roles.includes("Admin")){
      return true;
    }else{
      return false;
    }
  }

  //obtenemos el id del usuario
  getIdUsuario():string{
    let usuario = this.getInforUsuario();
    return usuario.sub
  }
}
