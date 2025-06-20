import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JuegoAdminService {

  constructor(private http:HttpClient) {
     this.headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
   }

  setPreguntas(preguntas:any[],nombreCategoria:string):Observable<any>{
    let headers = this.headers;
    return this.http.post(`http://localhost:5075/Game/Admin/preguntas/${nombreCategoria}`,preguntas,{headers});
  }

  
  eliminarCategoria(idCategoria:number):Observable<any>{
    let headers = this.headers;
    return this.http.get<any>(`http://localhost:5075/Game/Admin/preguntas/delete/category/${idCategoria}`,{headers});
  }


  public headers:any;
}
