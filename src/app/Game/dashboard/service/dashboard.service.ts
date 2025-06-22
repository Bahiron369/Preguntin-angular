import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../../Auth/services/auth.service';
import { environment } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root'
})

//la mayoria de los servicion son llamadas a las API
export class DashboardService {

  constructor(private http:HttpClient, private auth:AuthService) {
    //en la cabecera se configura la autorizacion
    this.headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    //id del usario
    this.idUsuario = this.auth.getIdUsuario();
   }

   //obtiene los datos de la categoria
  obtenerCategoria():Observable<any>{
    let headers = this.headers;
    return this.http.get<any>(environment.url+`/Game/player/categorias/${this.idUsuario}`, {headers});
  }

  //obtiene los datos de los puntos de la categoria
  obterPuntoCategoria():Observable<any>{
    let headers = this.headers;
    return this.http.get<any>(environment.url+`/Game/player/categorias/${this.idUsuario}`, {headers});
  }

  //actualiza los puntos del jugador
  setPuntosJugador(puntos:number):Observable<string>{
    let headers = this.headers;
    return this.http.post<string>(environment.url+'/Game/player/puntosJugador',{"id":this.idUsuario, "puntos":puntos},{headers})
  }

  //obtiene el top global de la categoria
  obtnerTopCategoria(idCategoria:number):Observable<any>{
    let headers = this.headers;
    return this.http.get<any>(environment.url+`/Game/player/PuntosGlobalcategoria/top/${idCategoria}`,{headers})
  }

  public headers:any;
  public idUsuario:any;
}
