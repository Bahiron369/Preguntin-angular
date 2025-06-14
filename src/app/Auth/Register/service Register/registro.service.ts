import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor(private Http:HttpClient) { }

  enviarCodigo(email:string):Observable<any>{
      return this.Http.post('http://localhost:5075/Account/Register/valid',{"email":email}, {
        headers: {'Content-Type': 'application/json'}
      });
  }

  ValidarInformacion(usuario:any):Observable<any>{
    return this.Http.post('http://localhost:5075/Account/Register/check',usuario,{
      headers: {'Content-Type':'application/json'}
    })
  }

  RegistrarUsuario(usuario:any):Observable<any>{
    return this.Http.post('http://localhost:5075/Account/Register',usuario,{
      headers: {'Content-Type':'application/json'}
    });
  }
}
