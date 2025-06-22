import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  //envia al servidor los datos del usuario como email y contraseña para procesarlos 
  enviarDatos(email:string,contrasena:string):Observable<any>{
    return this.http.post<string>(environment.url+'/Account/Login',{'Email':email,'password':contrasena},{
      headers: {'Type-Content' : 'application/json'}
    });
  }
}
