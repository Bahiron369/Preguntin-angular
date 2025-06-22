import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Preguntas } from '../../Models/preguntas/Preguntas.models';

@Injectable({
  providedIn: 'root'
})
export class ObtenerPreguntasPublicService {

  constructor(private httpClient:HttpClient) { }

  //obtiene las preguntas del json local
  GetPreguntas():Observable<any[]>{
    return this.httpClient.get<any[]>('preguntas publicas/preguntas.json').pipe(map((preguntas:any[])=>preguntas.map(p=> new Preguntas(p))));
  }

  //sirve para conbinar las respuestas de forma aleatoria evitando el mismo orden 
  GetRespuestaAleatorias(pregunta:any){
    let respuesta =  pregunta.incorrect_answers;    
    const indiceAleatorio = Math.floor(Math.random() * (respuesta.length + 1));
    respuesta.splice(indiceAleatorio,0,pregunta.correct_answer);
    return respuesta;
  }

  //obtiene la pregunta correcta de las preguntas que provienen del servidor
  GetRespuestaAleatoriasHttp(pregunta:any){
      let respuesta =  pregunta.respuestasIncorrecta;    
    const indiceAleatorio = Math.floor(Math.random() * (respuesta.length + 1));
    respuesta.splice(indiceAleatorio,0,pregunta.respuestasCorrecta);
    return respuesta;
  }
}
