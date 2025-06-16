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

  public constructor(private router:ActivatedRoute, private preguntasService:PreguntasService, private respuestaService:ObtenerPreguntasPublicService){
    router.paramMap.subscribe({
      next: (params)=>{
        this.nombreCategoria = params.get('categoria');
        this.idCategoria = params.get('idCategoria');
      },
      error: (errors)=>{
        console.log(errors);
      }
    })
  }

  ngOnInit(): void {
    this.preguntasService.GetPreguntas(this.nombreCategoria).subscribe({
       next: (result)=>{
        this.preguntas = result;
      },
      error: (errors)=>{
        console.log(errors);
      }
    });
  } 

  Start(){
    this.start=!this.start;
    this.PreguntaSiguiente();
  }

  tiempoPregunta(){
 if(this.contadorPreguntas>10){
          this.finish=true;
          console.log("hola")
        }
    let setIntervalo = setInterval(()=>{

      if(!this.pausarTiempo)
        this.tiempo--;

      if(this.tiempo<=0 || this.preguntaContestada){
       
        clearInterval(setIntervalo);
        this.tiempoEsperaMensaje();
      }

    },1000)
  }

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

  selectComodin(comodin:string){

    if(!this.estadoComodines()){

      if(comodin=="Pausar Tiempo"&& !this.listComodimesUsados.includes(comodin)){
        this.comodinPausarTiempo(comodin);
      }else if(comodin=="50 / 50"&& !this.listComodimesUsados.includes(comodin)){
        this.comodinEliminarDosRespuesta(comodin);
      }else if(comodin=="Puntos x3"&& !this.listComodimesUsados.includes(comodin)){
        this.comodinAgregarPuntos(comodin);
      }else if(comodin=="Respuesta mitad puntos"&& !this.listComodimesUsados.includes(comodin)){
        this.comodinMostrarRespuestaCorrecta(comodin);
      }else if(comodin=="Tiempo x2"&& !this.listComodimesUsados.includes(comodin)){
        this.comodinAgregarTiempo(comodin);
      }
     
    }
  }

  comodinAgregarTiempo(comodin:string){
    if(this.comodinesUsados<3){
      this.agregarTiempo=true;
      this.tiempo += 90;
      this.comodinesUsados++;
      this.comodinUsadoPregunta=true;
      this.listComodimesUsados.push(comodin);
    }
  }

  comodinPausarTiempo(comodin:string){
     if(this.comodinesUsados<3){
        this.pausarTiempo=true;
        this.comodinesUsados++;
        this.comodinUsadoPregunta=true;
        this.listComodimesUsados.push(comodin);
      }
  }

  comodinAgregarPuntos(comodin:string){
    if(this.comodinesUsados<3){
      this.agregarPuntosPregunta = true;
      this.pregunta.puntoPregunta*= 3;
      this.comodinesUsados++; 
      this.comodinUsadoPregunta=true;
      this.listComodimesUsados.push(comodin);
    }

  }

  comodinMostrarRespuestaCorrecta(comodin:string){
    if(this.comodinesUsados<3){
        this.mostrarRespuesta=true;
        this.pregunta.puntoPregunta/= 2;
        this.comodinesUsados++;
        this.comodinUsadoPregunta=true;
        this.listComodimesUsados.push(comodin);
      }
    
  }

  comodinEliminarDosRespuesta(comodin:string){
    if(this.comodinesUsados<=3){
      this.eliminarDosRespuesta=true;
      this.comodinesUsados++;
      this.comodinUsadoPregunta=true;
      this.respuestasIncorrectSelect = this.pregunta.respuestasIncorrecta.filter((p:any)=>p!=this.pregunta.respuestasCorrecta);
      this.respuestasIncorrectSelect.pop();
      this.listComodimesUsados.push(comodin);
    }
  }

  estadoComodines():boolean{
    let desactivar = this.comodinesUsados>3||this.comodinUsadoPregunta ? true : false;
    return desactivar;
  }

  PreguntaSiguiente(){
    this.restablecerValores();
    
  }

  restablecerValores(){
    if(this.contadorPreguntas<10){

      this.pregunta = this.preguntas[this.contadorPreguntas];
      this.contadorPreguntas++;
      this.comodinUsadoPregunta=false;
      this.siguiente_pregunta = true;
      this.preguntaContestada=false;
      this.pregunta.respuestasIncorrecta = this.pregunta.respuestasIncorrecta.filter((p)=>p != this.pregunta.respuestasCorrecta);
      this.respuestas = this.respuestaService.GetRespuestaAleatoriasHttp(this.pregunta);
      this.respuestasIncorrectSelect = this.pregunta.respuestasIncorrecta.slice(-2);
      this.respuestaSelecionada="";
      this.mostrarRespuesta=false;
      this.eliminarDosRespuesta=false;
      this.pausarTiempo=false;
      this.finish=false;
      this.tiempoPregunta();

    }else{
      this.contadorPreguntas=11;
      this.finish=true;
      console.log("hola");
      this.preguntasService.setPuntosCategoria(this.idCategoria,this.puntosAcumulados).subscribe({
         next:(mensaje)=>{
          console.log(mensaje);
         },
          error: (errors)=>{
            console.log(errors);
          }
      });
    }
      
  
  }

  RespuestaSeleccionada(nombre:string){
    //acumula puntos
    this.puntosAcumulados += nombre == this.pregunta.respuestasCorrecta ? this.pregunta.puntoPregunta :  this.puntosAcumulados >0 ? -75 : 0;
    this.respuestaSelecionada = nombre;
    this.preguntaContestada=true;
  }

  public nombreCategoria:any;
  public idCategoria:any;
  public preguntas:any[] = [];
  public contadorPreguntas:number=8;
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
  public listComodimesUsados:string[] = [];

  //puntos del jugador
  public puntosAcumulados:number=0;

  //tiempo por pregunta en segundos
  public tiempo:number = 90;
  public tiempoEspera:number=0;

  //iniciando juego
  public start:boolean=false;
  public finish:boolean=false;

  public siguiente_pregunta:boolean=true;

  public preguntaContestada:boolean=false;
  public respuestaSelecionada:string="";

  //datos del juego 
  public respuestas:string[] = [];
  public indexRespuesta:string[] = ['A','B','C','D']
  public respuestasIncorrectSelect:string[] = [] ;
  public comodines: string[] = ["Pausar Tiempo","50 / 50","Puntos x3","Respuesta mitad puntos","Tiempo x2"];

  ///////////////////////////////
  ///estilos////////////
  public colorFondo: string = "";
  public colorBorde: string = "";
  //////////////////////////
}
