import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  enviarDatos(email:string,contrasena:string):Observable<any>{
    return this.http.post<string>('http://localhost:5075/Account/Login',{'Email':email,'password':contrasena},{
      headers: {'Type-Content' : 'application/json'}
    });
  }
}
