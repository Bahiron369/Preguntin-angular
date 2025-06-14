import { Injectable } from '@angular/core';
import {  Router } from '@angular/router';
import { Observable } from 'rxjs';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private route:Router) { }

  UsuarioAutenticado():Observable<boolean>{
      let usuario = localStorage.getItem('token');

      let estadoUsuario = new Observable<boolean>((observer)=>{
        usuario==null ? observer.next(false) : observer.next(true)
      });

      return  estadoUsuario;
  }

  cerraSesion(){
    localStorage.removeItem('token')
    this.route.navigate(['/'])
  }

  getInforUsuario():any{
    let token = localStorage.getItem('token')

    if(token!=null){
      return jwtDecode(token)
    }else{
      return null;
    }
  }

  getIdUsuario():string{
    let usuario = this.getInforUsuario();
    return usuario.sub
  }
}
