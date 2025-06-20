import { Component } from '@angular/core';
import { parse } from 'graphql';
import { DashboardService } from '../../../Game/dashboard/service/dashboard.service';
import { JuegoAdminService } from '../services/juego-admin.service';

@Component({
  selector: 'app-agregar-categoria',
  standalone: false,
  templateUrl: './agregar-categoria.component.html',
  styleUrl: './agregar-categoria.component.css'
})
export class AgregarCategoriaComponent{

  constructor(private categoriaService:DashboardService, private juegoService:JuegoAdminService){
      this.categoriaService.obtenerCategoria().subscribe({
        next:(datos)=>{
          this.nombreCategoriasExistentes = datos.map((p:any)=>p.nombre);
        }
      });
  }
public token:any;
 
  agregarRespuestaBooleana(IsCorrect:boolean,valor:boolean){
      if(IsCorrect){
        this.pregunta.respuestasCorrecta = String(valor);
        this.pregunta.respuestasIncorrecta.push(String(!valor));
      }
  }

  agregarPregunta(){
    this.pregunta.puntoPregunta = this.pregunta.dificultad=="easy" ? 150 : this.pregunta.dificultad == "medium" ? 200 : 300;
    if(this.pregunta.tipo=="multiple")
      this.pregunta.respuestasIncorrecta = this.respuestasIncorrecta;
    this.pregunta.nombreCategoria = this.nombreCategoria;
    if(this.comprobarPregunta()){
      this.contadorPreguntas++;
      this.preguntasAlmacenadas.push(this.pregunta);
      this.limpiarPregunta();
    }else{
      this.errorPregunta = "pregunta no valida";
    }

  }

  limpiarPregunta(){
    this.pregunta = {
        dificultad: "",
        nombre: "",
        nombreCategoria: "",
        puntoPregunta: 0,
        respuestasCorrecta:"",
        respuestasIncorrecta:[],
        tiempoRespuesta: "90",
        tipo: ""
      };
    this.errorPregunta="";
    this.errorCategoria="";
  }

  comprobarPregunta():boolean{
      for(let clave in this.pregunta){
        if(this.pregunta[clave]=="")
          return false;
        if(clave=="respuestasIncorrecta"){
          for(let i = 0; i < this.pregunta[clave].length; i++){
             if(this.pregunta[clave][i]=="")
              return false;
          }
        }
      }
      return true;
  }

  guardarPregunta(){
    if(this.contadorPreguntas>=10){
      console.log(this.preguntasAlmacenadas)
        this.juegoService.setPreguntas(this.preguntasAlmacenadas,this.nombreCategoria).subscribe({
          next:(data)=>{
            console.log(data)
          },
          error:err=>{
            console.log(err.error)
          }
        });
    }else{
      this.errorCategoria="la categoria tiene que tener minimo 10 preguntas"
    }
  }
  public nombreCategoria:string="";
  public nombreCategoriasExistentes:any;
  public contadorPreguntas:number=0;
  public preguntasAlmacenadas:any[]=[];
  public respuestasIncorrecta:any[] =['','',''];
  public pregunta:any = {
    dificultad: "",
    nombre: "",
    nombreCategoria: "",
    puntoPregunta: 0,
    respuestasCorrecta:"",
    respuestasIncorrecta:[],
    tiempoRespuesta: "00:01:30",
    tipo: ""
  };
  
  errorPregunta:string = "";
  errorCategoria:string="";
}
