import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root'
})

//servicio para el envio de informacion a la API del servidor
export class RegistroService {

  constructor(private Http:HttpClient) { }

  //envio del emial 
  enviarCodigo(email:string):Observable<any>{
      return this.Http.post(environment.url+'/Account/Register/valid',{"email":email}, {
        headers: {'Content-Type': 'application/json'}
      });
  }

  //enviamos los datos del usario: nombre, correo, telefono, etc. para chequeo de los datos, evita informacion invalida
  ValidarInformacion(usuario:any):Observable<any>{
    return this.Http.post(environment.url+'/Account/Register/check',usuario,{
      headers: {'Content-Type':'application/json'}
    })
  }

  //envio de los datos del usuario para el registro
  RegistrarUsuario(usuario:any):Observable<any>{
    return this.Http.post(environment.url+'/Account/Register',usuario,{
      headers: {'Content-Type':'application/json'}
    });
  }
}
