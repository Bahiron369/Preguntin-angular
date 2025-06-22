import { Component, EventEmitter, Input, output, Output } from '@angular/core';

@Component({
  selector: 'app-comodines',
  standalone: false,
  templateUrl: './comodines.component.html',
  styleUrl: './comodines.component.scss'
})
export class ComodinesComponent {

  //estos datos provienen del componente padre (Preguntas)
  @Input() pregunta: any;
  @Input() comodinUsadoPregunta: any;
  @Output() enviarTiempo = new EventEmitter<any>();
  @Output() enviarPausarTiempo = new EventEmitter<any>();
  @Output() enviarPuntosPregunta = new EventEmitter<any>();
  @Output() enviarMostrarPregunta = new EventEmitter<any>();
  @Output() enviarEliminarDosRespuesta = new EventEmitter<any>();
  
  public constructor(){  }

  //funcion que enruta los comodines, obtiene el nombre dle comodin y lo seleciona
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

  //agrega tiempo a la pregunta
  comodinAgregarTiempo(comodin:string){
    if(this.comodinesUsados<3){
      this.tiempo += 90;
      this.enviarTiempo.emit(this.tiempo);
      this.comodinesUsados++;
      this.comodinUsadoPregunta=true;
      this.listComodimesUsados.push(comodin);
    }
  }

  //congela el tiempo de la pregunta
  comodinPausarTiempo(comodin:string){
     if(this.comodinesUsados<3){
        this.enviarPausarTiempo.emit(true);
        this.comodinesUsados++;
        this.comodinUsadoPregunta=true;
        this.listComodimesUsados.push(comodin);
      }
  }

  //triplica los puntos de la pregunta
  comodinAgregarPuntos(comodin:string){
    if(this.comodinesUsados<3){
      this.pregunta.puntoPregunta*= 3;
      this.enviarPuntosPregunta.emit(this.pregunta.puntoPregunta)
      this.comodinesUsados++; 
      this.comodinUsadoPregunta=true;
      this.listComodimesUsados.push(comodin);
    }

  }

  //muestr ala repsuesta correcta a mitad de puntos
  comodinMostrarRespuestaCorrecta(comodin:string){
    if(this.comodinesUsados<3){
        this.enviarMostrarPregunta.emit(true)
        this.comodinesUsados++;
        this.comodinUsadoPregunta=true;
        this.listComodimesUsados.push(comodin);
      }
    
  }

  //muestra dos respuestas incorrectas, dejando una correcta y una incorrecta
  comodinEliminarDosRespuesta(comodin:string){
    if(this.comodinesUsados<3){
      this.enviarEliminarDosRespuesta.emit(true)
      this.comodinesUsados++;
      this.comodinUsadoPregunta=true;
      this.listComodimesUsados.push(comodin);
    }
  }

  //valida el estado del comidon (usado, no usado, cantidad de comodines usados)
  estadoComodines():boolean{
    let desactivar = this.comodinesUsados>3||this.comodinUsadoPregunta ? true : false;
    return desactivar;
  }

  //comodines ayudan al jugador
  //1. pausar timepo
  //2. eliminar dos respuesta
  //3. doblejar puntos
  //4. mostrar respuesta con la mitad de los puntos
  //3. solo se puede usar tres comodimes en todo el juego
  
  public comodinesUsados:number =0;
  public listComodimesUsados:string[] = [];

  public tiempo:number = 0;
  public respuestasIncorrectSelect:any;

  //iniciando juego
  public finish:boolean=false;

  public comodines: string[] = ["Pausar Tiempo","50 / 50","Puntos x3","Respuesta mitad puntos","Tiempo x2"];

}
