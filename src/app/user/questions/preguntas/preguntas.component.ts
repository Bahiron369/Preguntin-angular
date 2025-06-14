import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PreguntasService } from '../../dashboard/service/preguntas.service';
import { ObtenerPreguntasPublicService } from '../../../public/Game/service preguntaPublicas/obtener-preguntas-public.service';

@Component({
  selector: 'app-preguntas',
  standalone: false,
  templateUrl: './preguntas.component.html',
  styleUrl: './preguntas.component.scss'
})
export class PreguntasComponent implements OnInit{

  public constructor(private router:ActivatedRoute, private respuestaService:ObtenerPreguntasPublicService){
    router.paramMap.subscribe({
      next: (params)=>{
        this.nombreCategoria = params.get('categoria');
      },
      error: (errors)=>{
        console.log(errors);
      }
    })
  }

  ngOnInit(): void {
    /*
    this.preguntasServicio.GetPreguntas(this.nombreCategoria).subscribe({
      next: (result)=>{
        this.preguntas = result;
        console.log(result)
      },
      error: (errors)=>{
        console.log(errors);
      }
    });*/
     
  } 

  Start(){
    this.start=!this.start;
    this.PreguntaSiguiente();
  }

  tiempoPregunta(){

    let setIntervalo = setInterval(()=>{

      if(!this.pausarTiempo)
        this.tiempo--;
      else
        clearInterval(setIntervalo);

      if(this.tiempo<=0){
        clearInterval(setIntervalo);
        this.tiempoEsperaMensaje()
      }

    },1000)
  }

  tiempoEsperaMensaje(){

    let tiempoEspera = 3; //esperar 3 segundos antes de  la siquiente pregunta
    
    let setIntervaloEspera = setInterval(()=>{
      tiempoEspera--;
      console.log("hola")
      if(tiempoEspera<=0)
        clearInterval(setIntervaloEspera);

    },1000)
  }

  comodinAgregarTiempo(){
    if(this.comodinesUsados<=3){
      this.agregarTiempo=true;
      this.tiempo += 90;
      this.comodinesUsados++;
      this.comodinUsadoPregunta=true;
    }
  }

  comodinPausarTiempo(){
     if(this.comodinesUsados<=3){
        this.pausarTiempo=true;
        this.comodinesUsados++;
        this.comodinUsadoPregunta=true;
      }
  }

  comodinAgregarPuntos(){
    if(this.comodinesUsados<=3){
      this.agregarPuntosPregunta = true;
      this.preguntas.puntoPregunta*= 3;
      this.comodinesUsados++; 
      this.comodinUsadoPregunta=true;
    }

  }

  comodinMostrarRespuestaCorrecta(){
    if(this.comodinesUsados<=3){
        this.mostrarRespuesta=true;
        this.preguntas.puntoPregunta/= 2;
        this.comodinesUsados++;
        this.comodinUsadoPregunta=true;
      }
    
  }

  comodinEliminarDosRespuesta(){
    if(this.comodinesUsados<=3){
      this.eliminarDosRespuesta=true;
      this.comodinesUsados++;
      this.comodinUsadoPregunta=true;
    }
  }
  
  estadoComodines():boolean{
    let desactivar = this.comodinesUsados>3||this.comodinUsadoPregunta ? true : false;
    return desactivar;
  }

  PreguntaSiguiente(){
    this.comodinUsadoPregunta;
    this.tiempoPregunta()
    this.colorPregunta();
    this.respuestas = this.respuestaService.GetRespuestaAleatorias(this.preguntas)
    this.siguiente_pregunta = !this.siguiente_pregunta;
  }

  colorPregunta(){
    this.colorFondo = this.preguntas.difficulty=='easy' ? '#e8f8f5' : this.preguntas.difficulty=='medium' ? '#fef9e7' : '#f5b7b1'
    this.colorBorde = this.preguntas.difficulty=='easy' ? '#16a085' : this.preguntas.difficulty=='medium' ? '#f1c40f' : '#b03a2e'
  }


  nombreCategoria:any;
  preguntas =  {
      "type": "multiple",
      "difficulty": "easy",
      "category": "Art",
      "puntoPregunta":200,
      "tiempoRespuesta": 5,
      "question": " What color is produced by mixing black and white?",
      "correct_answer": "Grey",
      "incorrect_answers": [
        "Black",
        "Brown",
        "White"
      ]
    }

  //comodines ayudan al jugador
  //1. pausar timepo
  //2. eliminar dos respuesta
  //3. doblejar puntos
  //4. mostrar respuesta con la mitad de los puntos
  //3. solo se puede usar tres comodimes en todo el juego
  
  public pausarTiempo:boolean = false;
  public eliminarDosRespuesta:boolean = false;
  public agregarPuntosPregunta:boolean = false;
  public mostrarRespuesta:boolean = false;
  public agregarTiempo:boolean = false;
  public comodinesUsados:number =0;
  public comodinUsadoPregunta:boolean = false;

  //puntos del jugador
  public puntosAcumulados:number=0;

  //tiempo por pregunta en segundos
  public tiempo:number = 5;

  //iniciando juego
  public start:boolean=false;

  public siguiente_pregunta=true;

  //datos del juego 
  public respuestas:string[] = [];
  public indexRespuesta:string[] = ['A','B','C','D']

  ///////////////////////////////
  ///estilos////////////
  public colorFondo: string = "";
  public colorBorde: string = "";
  //////////////////////////
}
