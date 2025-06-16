import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../../Auth/services/auth.service';
import { ObtenerPreguntasPublicService } from '../../../public/Game/service preguntaPublicas/obtener-preguntas-public.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient, private auth:AuthService) {
    this.headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    this.idUsuario = this.auth.getIdUsuario();
   }

  obtenerCategoria():Observable<any>{
    let headers = this.headers;
    return this.http.get<any>(`http://localhost:5075/Game/player/categorias/${this.idUsuario}`, {headers});
  }

  setPuntosJugador(puntos:number):Observable<string>{
    let headers = this.headers;
    return this.http.post<string>('http://localhost:5075/Game/player/puntosJugador',{"id":this.idUsuario, "puntos":puntos},{headers})
  }

  public headers:any;
  public idUsuario:any;
}
