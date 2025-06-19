import { Component, OnInit } from '@angular/core';
import { GraphqlService } from '../../Service GraphQL/graphql.service';
import { Apollo } from 'apollo-angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-informacion-usuario',
  standalone: false,
  templateUrl: './informacion-usuario.component.html',
  styleUrl: './informacion-usuario.component.scss'
})

export class InformacionUsuarioComponent implements OnInit{

  constructor(private gql:GraphqlService, private apolo:Apollo, private route:ActivatedRoute, private router:Router){
    
  }

  ngOnInit(): void {
    this.obneterInfUsuario();
    this.route.queryParamMap.subscribe((param)=>{
      this.tokenCambioEmail = param.get('token');
      this.nuevoEmail = param.get('email');
      if(this.tokenCambioEmail!=null&&this.tokenCambioEmail!=""){

      }
    })
  }
  
  HabilitarCampo(campo:string){
    this.desactivarCampo[campo] = false;
  } 
  
  ingresarInformacion(campo:string, valor:string){
    //comprobamos que la informacion ingresada sea valida para procesar
    if(this.comprobarInformacion(campo,valor)){

      this.errores[campo]="";//elimina el mensaje de error
      this.borrarInformacionEnviar() //elimina los campos cambiados
      this.informacionCambiar[campo] = valor; //agregamos campos a cambiar

      this.EnviarInformacionServidor(campo);

    }else{
      if(this.usuario[campo]!=valor||this.usuario[campo]=="numero"){
        this.errores[campo]= `${campo} no valido`;
      }else{
        this.desactivarCampo[campo]=true;
      }
    }
  }

  EnviarInformacionServidor(campo:string){
      this.gql.actualizarInformacionUsuario(this.informacionCambiar).subscribe({
        next:(data)=>{

          let datos:any = data.data; 
          if(datos.updateJugador.valido){
            if(campo=="email"){
              this.mensajeServidor[campo]="se envio un mensaje al correo ingresado"
            }else{
              this.mensajeServidor[campo]=datos.updateJugador.mensajes;
            }
            this.desactivarCampo[campo]=true;
            
          }else{
            this.errores[campo] = datos.updateJugador.mensajes;
             this.mensajeServidor[campo]="";
          }

          if(datos.updateJugador.token!=null)
            localStorage.setItem('token',datos.updateJugador.token);

          this.obneterInfUsuario();
        },
        error:(err)=>{
          console.log(err.error);
        }
      })
  }

  obneterInfUsuario(){
    //obtener la informacion del usuario 
    this.apolo.watchQuery({
      query:this.gql.queryInformacionUsuario()
      }).valueChanges.subscribe({
        next:(datos:any)=>{
          //guardar la informacion de la base de datos y mostrarla al usuario
          this.usuario["id"] = datos.data.queryInfUser.id; 
          this.usuario["nombre"] = datos.data.queryInfUser.name;
          this.usuario["numero"] = datos.data.queryInfUser.telefono;
          if(this.tokenCambioEmail!=null&&this.tokenCambioEmail!=""){
            this.gql.actualizarCorreo(this.usuario["id"],this.nuevoEmail,this.tokenCambioEmail).subscribe({
              next:()=>{
                this.usuario["email"] = atob(this.nuevoEmail);
              },
              error:(err)=>{
                console.log(err.error)
              }
            });
          }else{
            this.usuario["email"] = datos.data.queryInfUser.email;
          }
        },error:(err)=>{
          console.log(err.error)
        }
     });
  }

  comprobarInformacion(campo:string,valor:string):boolean{
    //si el valor no es valido
    if(valor!=null){
      if(valor!=this.usuario[campo]){//el valor no sea igual al dato ya existente
          if(campo=="nombre"){
            //comprobar longitud del nombre
            return valor.length>3 && valor.length<15 ? true : false //comprovar que todo este bien
          }else if(campo=="numero"){
            //comprobar el patron del numero (aceptar solo numeros)
            let patron = /^[0-9]+$/;
            return valor.length==10 && patron.test(valor) ? true : false //comprobar que todo este bien
          }else if(campo=="email"){
            //comprobar patron correo electronico valido
            let patron = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}/; 
            return patron.test(valor);
          }else
            return false;

      }else
        return false;

    }else
      return false;
  }

  borrarInformacionEnviar():void{
    this.informacionCambiar = {
      nombre: null,
      numero: null,
      email: null
     }
    this.mensajeServidor = {
        nombre:"",
        numero:"",
        email:""
    };

  }

  get Claves():any{
    return Object.keys(this.usuario);
  }

  ActivarCambioContrasena(){
      this.activarCambioContrasena = true;
  }

  redirigirLogin(){
    localStorage.removeItem('token');
    this.router.navigate(['auth/login']);
  }
  cambiarContrasena(){
      if(this.comprobarContrasena()){
        this.gql.actualizarContrasenaUsuario(this.actualContrasena,this.nuevacontrasena).subscribe({
          next:(response:any)=>{
            if(response.data.updateJugador.valido)
              this.contrasenaCambiada=true;
            else
              this.errorPassword=response.data.updateJugador.mensajes;
          },
          error:(err)=>{
            console.log(err.error);
          }
        });
      }
  }

  comprobarContrasena(){
    let patron = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[*+-.#@%&$!]).{8,}$/;

    //condisionales anidados para comprovar todos los requerimientos de la contraseña
    this.errorNewPassword = !patron.test(this.nuevacontrasena) ? 'Contraseña no valida' :
      this.nuevacontrasena != this.confirmarContrasena ? 'Las contraseñas no son iguales' :
          this.nuevacontrasena == null || this.nuevacontrasena.length < 8 ? 'Contraseña no valida' : '';

    this.errorPassword = this.actualContrasena=="" ? 'Contraseña no valida' : '';

    if(this.errorNewPassword==""&&this.errorPassword=="")    
      return true
    else return false
  }

  public usuario:any=[]
  //la informacion que se envia al servidor para cambiar
  public informacionCambiar:any = [];
  public tokenCambioEmail:any;
  public nuevoEmail:any;

  //actualizar contraseña 
  public nuevacontrasena:string="";
  public actualContrasena:string="";
  public confirmarContrasena:string="";
  public errorPassword:string="";
  public errorNewPassword:string="";
  public contrasenaCambiada:boolean=false;

  public mensajeServidor:any = {
    nombre:"",
    numero:"",
    email:""
  };

  public desactivarCampo:any={
    nombre: true,
    numero: true,
    email: true
  }
 
  public errores:any={
    nombre: "",
    numero: "",
    email: ""
  }

  //correoActual
  public activarCambioContrasena:boolean=false;
}
