import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ObtenerPreguntasPublicService } from '../../service preguntaPublicas/obtener-preguntas-public.service';
import { Preguntas } from '../../../Models/preguntas/Preguntas.models';

@Component({
  selector: 'app-game-public',
  standalone: false,
  templateUrl: './game-public.component.html',
  styleUrl: './game-public.component.scss'
})

export class GamePublicComponent implements OnInit{

  constructor(private router:Router, private preguntasServicio:ObtenerPreguntasPublicService){}

  ngOnInit(): void {
    this.GetAllQuestion();
  }

  GetAllQuestion(){
    this.preguntasServicio.GetPreguntas().subscribe(data=>{
          this.preguntas = data;
    })
  }
  public start: boolean = false;
  public preguntas: Preguntas[] = [];
  public preguntaCurrent: any;
  public numeroPregunta:number = 0; 
  public respuesta:string[] = [];
  public botonSiguienteActivado:boolean = false;
  public PreguntaContestada = false;
  public RespuestaSelecionada:string = ""

  //de todas las preguntas, se seleciona una y sus respuestas incorrecta y correcta, 
  //tambien se agregan las preguntas aleatoriamente
  GetPreguntasPublicas(){

    this.botonSiguienteActivado=false;
    this.PreguntaContestada=false;
    this.preguntaCurrent = this.preguntas[this.numeroPregunta];
    this.respuesta = this.preguntasServicio.GetRespuestaAleatorias(this.preguntaCurrent)
    
    this.numeroPregunta++;
  }

  //valida respuesta del usuario
  ValidarRespuesta(respuesta:string){
    this.RespuestaSelecionada = respuesta
    this.PreguntaContestada=true
    this.botonSiguienteActivado = true
  } 
  
  /*Reinicia los valores y el inicio del juego es falso */
  Iniciar(jugadondo:boolean){
    this.start = jugadondo
    this.GetAllQuestion()
    this.preguntaCurrent;
    this.numeroPregunta = 0; 
    this.respuesta = [];
    this.botonSiguienteActivado = false;
    this.PreguntaContestada = false;
    this.RespuestaSelecionada = ""
  }

  Redirigir(url:string){
    this.router.navigate([url])
  }
}
