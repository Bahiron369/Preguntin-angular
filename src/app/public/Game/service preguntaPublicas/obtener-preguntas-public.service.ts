import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { HttpPreguntas } from '../../Models/resultHttpPreguntas/resultHttp.model';
import { Preguntas } from '../../Models/preguntas/Preguntas.models';

@Injectable({
  providedIn: 'root'
})
export class ObtenerPreguntasPublicService {

  constructor(private httpClient:HttpClient) { }

  GetPreguntas():Observable<any[]>{
    return this.httpClient.get<any[]>('preguntas publicas/preguntas.json').pipe(map((preguntas:any[])=>preguntas.map(p=> new Preguntas(p))));
  }

  GetRespuestaAleatorias(pregunta:any){
    let respuesta = pregunta.incorrect_answers;    
    const indiceAleatorio = Math.floor(Math.random() * (respuesta.length + 1));
    respuesta.splice(indiceAleatorio,0,pregunta.correct_answer);
    return respuesta;
  }
}
