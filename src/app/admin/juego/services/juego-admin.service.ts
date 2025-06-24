import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class JuegoAdminService {

  constructor(private http:HttpClient) {
     this.headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
   }

  setPreguntas(preguntas:any,nombreCategoria:string):Observable<any>{
    let headers = this.headers;
    return this.http.post(environment.url+`/Game/Admin/preguntas/${nombreCategoria}`,preguntas,{headers});
  }
  
  eliminarCategoria(idCategoria:number):Observable<any>{
    let headers = this.headers;
    return this.http.delete<any>(environment.url+`/Game/Admin/preguntas/delete/category/${idCategoria}`,{headers});
  }

  eliminarPregunta(idPregunta:number):Observable<any>{
    let headers = this.headers;
    return this.http.delete<any>(environment.url+`/Game/Admin/preguntas/delete/pregunta/${idPregunta}`,{headers}); 
  }

  eliminarTodasPreguntas(idCategoria:number):Observable<any>{
    let headers = this.headers;
    return this.http.delete<any>(environment.url+`/Game/Admin/preguntas/${idCategoria}`,{headers});
  }

  GetUsuarios():Observable<any>{
    let headers = this.headers;
    return this.http.get<any>(environment.url+`/Admin/Users/AllUsers`,{headers});
  }

  updateRoleUsuario(idUsuario:string,roles:any):Observable<any>{
    let headers = this.headers;
    return this.http.put<any>(environment.url+`/Admin/Users/UpdateRoleUser/${idUsuario}`,roles,{headers});
  }

  deleteUser(idUsuario:string){
    let headers = this.headers;
    return this.http.delete<any>(environment.url+`/Admin/Users/DeleteUser/${idUsuario}`,{headers});
  }
  
  public headers:any;
}
