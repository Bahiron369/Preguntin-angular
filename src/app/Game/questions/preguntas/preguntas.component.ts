import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PreguntasService } from '../../dashboard/service/preguntas.service';
import { ObtenerPreguntasPublicService } from '../../../public/Game/service preguntaPublicas/obtener-preguntas-public.service';
import { DashboardService } from '../../dashboard/service/dashboard.service';

@Component({
  selector: 'app-preguntas',
  standalone: false,
  templateUrl: './preguntas.component.html',
  styleUrl: './preguntas.component.scss'
})
export class PreguntasComponent implements OnInit{

  //inyectamos las dependencias necesarios del juego
  public constructor(private router:ActivatedRoute, private preguntasService:PreguntasService, private respuestaService:ObtenerPreguntasPublicService, 
                     private route:Router,private puntosCategoriaService:DashboardService){

    //obtenemos la informacion de la categoria por medio de la url
    this.router.paramMap.subscribe({
      next: (params)=>{
        this.nombreCategoria = params.get('categoria');
        this.idCategoria = params.get('idCategoria');
      },
      error: (errors)=>{
        console.log(errors);
      }
    });

  //obtenemos los puntos de la categoris del servidor
   this.puntosCategoriaService.obterPuntoCategoria().subscribe({
      next: (data)=>{
          this.puntosCategoria = Number.parseInt(data.filter((p:any)=>p.nombre==this.nombreCategoria).map((p:any)=>p.puntosCategoria));
      },
      error: (errors)=>{
        console.log(errors);
      }
    });
  }

  //obtenemos del servidor las preguntas de la categoria selecionada
  ngOnInit(): void {
    
  } 

  //inicia el juego y mostramos la primera pregunta
  Start(){
    this.preguntasService.GetPreguntas(this.nombreCategoria).subscribe({
       next: (result)=>{
        this.start=!this.start;
        this.preguntas = result;
        this.PreguntaSiguiente();
      },
      error: (errors)=>{
        this.start=false;
        console.log(errors);
      }
    });
  }

  //tiempo que tiene cada respuesta 90 min por cada una 
  tiempoPregunta(){
    let setIntervalo = setInterval(()=>{
      if(!this.pausarTiempo)
        this.tiempo--;
      if(this.tiempo<=0 || this.preguntaContestada){
        clearInterval(setIntervalo);
        this.tiempoEsperaMensaje();
      }
    },1000)
  }

  //este tiempo es el que se usa para la transicion de las preguntas
  //sirve para dar tiempo de mostrar las respuesta corecta y la siguiente pregunta
  tiempoEsperaMensaje(){
    this.tiempoEspera = 3; //esperar 2 segundos antes de  la siquiente pregunta
    let setIntervaloEspera = setInterval(()=>{
       this.tiempoEspera --;
      if( this.tiempoEspera <=0){
        clearInterval(setIntervaloEspera);
        this.siguiente_pregunta=true;
        this.PreguntaSiguiente();
        this.tiempo=90;
      }
    },1000)
  }
  ///////////////////Comodines////////////////////////////
  //los comodines son usados para ayudar al jugador en una pregunta
  //solo se pueden usar 3 comodines en una ronda
  //son en total 5 comodines y cada uno ayuda de diferente forma

  //agrega el doble del tiempo
  comodinAgregarTiempo(tiempoComodin:any){
      this.tiempo += tiempoComodin;
      this.comodinUsadoPregunta=true;
  }

  //pausa el tiempo
  comodinPausarTiempo(pausarTiempoComodin:any){
      this.pausarTiempo=pausarTiempoComodin;  
      this.comodinUsadoPregunta=true;
  }

  //triplica los puntos
  comodinAgregarPuntos(puntosPreguntaComodin:any){
      this.pregunta.puntoPregunta = puntosPreguntaComodin;
      this.comodinUsadoPregunta=true;
  }

  //muestra la respuesta correcta a mitad de puntos
  comodinMostrarRespuestaCorrecta(mostrarRespuestaComodin:any){
      this.mostrarRespuesta=mostrarRespuestaComodin;
      this.comodinUsadoPregunta=true;
      this.pregunta.puntoPregunta/= 2;
  }

  //muestra dos respuestas incorrrectas
  comodinEliminarDosRespuesta(mostrarDosRespuestaIncorrectascomodin:any){
      this.eliminarDosRespuesta=mostrarDosRespuestaIncorrectascomodin;
      this.comodinUsadoPregunta=true;
      this.respuestasIncorrectSelect = this.pregunta.respuestasIncorrecta.filter((p:any)=>p!=this.pregunta.respuestasCorrecta);
      this.respuestasIncorrectSelect.pop();
  }

  /////////////////////////////////////////////////////////////

  //va a la siguiente pregunta y reestablece los valores de la pregunta
  PreguntaSiguiente(){
    this.restablecerValores();
  }

  //reestablece los valores de la pregunta
  //1. solo se muestra una pregunta al usuario, por lo cual siempre hay que limpiar los datos para mostra los nuevos
  restablecerValores(){
    if(this.preguntas == null){
      window.location.reload();
    }
    if(this.contadorPreguntas<this.preguntas.length&&this.preguntas.length>0&& this.preguntas != null){
      //reestablece los valores
      this.pregunta = this.preguntas[this.contadorPreguntas];
      this.indexRespuesta = this.pregunta.tipo=="boolean" ? ['',''] : ['A.','B.','C.','D.'];
      this.contadorPreguntas++;
      this.siguiente_pregunta = true;
      this.preguntaContestada=false;
      this.pregunta.respuestasIncorrecta = this.pregunta.respuestasIncorrecta.filter((p)=>p != this.pregunta.respuestasCorrecta);
      this.respuestas = this.respuestaService.GetRespuestaAleatoriasHttp(this.pregunta);
      this.respuestasIncorrectSelect = this.pregunta.respuestasIncorrecta.slice(-2);
      this.respuestaSelecionada="";
      this.pausarTiempo=false;
      this.comodinUsadoPregunta = false;
      this.eliminarDosRespuesta=false;
      this.mostrarRespuesta=false;
      this.finish=false;
      this.tiempoPregunta();

    }else{

      //si el juego finaliza envia los puntos al servidor 
      this.puntosCategoria+=this.puntosAcumulados;
      this.contadorPreguntas++;
      this.preguntasService.setPuntosCategoria(this.idCategoria,this.puntosAcumulados).subscribe({
         next:(mensaje)=>{
          console.log(mensaje);
          this.finish=true;
         },
          error: (errors)=>{
            console.log(errors);
            this.finish=true;
          }
      });

    }
  }

  //agrega puntos si la respuesta es la correcta y esta puntos si no lo es
  RespuestaSeleccionada(nombre:string){
    //acumula puntos
    this.puntosAcumulados += nombre == this.pregunta.respuestasCorrecta ? this.pregunta.puntoPregunta :  this.puntosAcumulados >=0 ? -75 : 0;
    this.respuestaSelecionada = nombre;
    this.preguntaContestada=true;
    this.preguntaContestadaCorrectamente += nombre == this.pregunta.respuestasCorrecta ? 1 : 0;
  }

  //vueleve al inicio al finalizar el juego
  volverInicio():void{
    this.route.navigate(['dashboard']);
  }

  //variables de la preguntas y categorias
  public nombreCategoria:any;
  public idCategoria:any;
  public preguntas:any[] = [];
  public contadorPreguntas:number=0;
  public siguiente_pregunta:boolean=true;
  public preguntaContestada:boolean=false;
  public preguntaContestadaCorrectamente:number = 0;
  public pregunta = {
    dificultad: "",
    nombre: "",
    nombreCategoria: "",
    puntoPregunta: 0,
    respuestasCorrecta: "",
    respuestasIncorrecta: 
    ['', '', ''],
    tiempoRespuesta: "",
    tipo: ""
  };

  //puntos del jugador
  public puntosAcumulados:number=0;
  public puntosCategoria:number = 0;

  //tiempo por pregunta en segundos
  public tiempo:number = 90;
  public tiempoEspera:number=0;

  //iniciando juego
  public start:boolean=false;
  public finish:boolean=false;

  public respuestaSelecionada:string="";

  //datos del juego 
  public respuestas:string[] = [];
  public indexRespuesta:string[] = ['A','B','C','D']
  public respuestasIncorrectSelect:string[] = [] ;
  public eliminarDosRespuesta:boolean = false;
  public pausarTiempo:boolean = false;
  public mostrarRespuesta:boolean = false;
  public comodinUsadoPregunta:boolean = false;

}
