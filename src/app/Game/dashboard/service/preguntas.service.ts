import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { AuthService } from '../../../Auth/services/auth.service';
import { environment } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {

  constructor(private http:HttpClient,private auth:AuthService) { 
    this.headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    this.idJugador = auth.getIdUsuario();
  }

  //obtienes las preguntas de la categoria seleccionada
  GetPreguntas(nombreCategoria:string):Observable<any>{
    let headers = this.headers;
    return this.http.get<any[]>(environment.url+`/Game/player/categoria/${nombreCategoria}`,{headers});
  }

  //obtiene todas las preguntas (Solo administradores)
  GetAllPreguntas(id:number, nombreCategoria:string){
    let headers = this.headers;
    return this.http.get<any[]>(environment.url+`/Game/Admin/preguntas/category/${id}/${nombreCategoria}/preguntas`,{headers});
  }

  //actualiza los puntos de la categoria
  setPuntosCategoria(idCategoria:number,puntos:number):Observable<any>{
    let headers = this.headers;
    return this.http.put(environment.url+`/Game/player/PuntosCategoria/${this.idJugador}/${idCategoria}/${puntos}`,'',{headers});
  }

  public headers:any;
  public idJugador:any;
}
