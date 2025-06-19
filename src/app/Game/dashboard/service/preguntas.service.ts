import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { AuthService } from '../../../Auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {

  constructor(private http:HttpClient,private auth:AuthService) { 
    this.headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    this.idJugador = auth.getIdUsuario();
  }

  GetPreguntas(nombreCategoria:string):Observable<any>{
    let headers = this.headers;
    return this.http.get<any[]>(`http://localhost:5075/Game/player/categoria/${nombreCategoria}`,{headers});
  }

  setPuntosCategoria(idCategoria:number,puntos:number):Observable<any>{
    let headers = this.headers;
    return this.http.put(`http://localhost:5075/Game/player/PuntosCategoria/${this.idJugador}/${idCategoria}/${puntos}`,'',{headers});
  }

  public headers:any;
  public idJugador:any;
}
