import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Preguntas } from '../../../public/Models/preguntas/Preguntas.models';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {

  constructor(private http:HttpClient) { 
    this.headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
  }

  GetPreguntas(nombreCategoria:string):Observable<any>{
    let headers = this.headers;
    return this.http.get<any[]>(`http://localhost:5075/Game/player/categoria/${nombreCategoria}`,{headers});
  }


  public headers:any;
}
