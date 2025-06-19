import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { RegistroService } from './service Register/registro.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(private fb:FormBuilder, private router:Router, private registroServicio:RegistroService){
    this.register = fb.group({
      nombre: ['',[Validators.required,Validators.minLength(5),Validators.maxLength(15)]],
      email: ['',[Validators.email,Validators.required,Validators.pattern(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}/)]],
      telefono: ['',[Validators.minLength(10),Validators.pattern(/^[0-9]+$/)]],
      password: ['',[Validators.required,Validators.minLength(8),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[*+-.#@%&$!]).{8,}$/)]],
      confirPassword: ['',Validators.required]
    })

    this.formCodigo = fb.group({
      codigo:['',Validators.required]
    })
  }

  async EnviarRegistro(){

      if(this.comprobarErrores()){
        this.usuario.Name = this.register.get("nombre")?.value;
        this.usuario.Email = this.register.get("email")?.value;
        this.usuario.Telefono = this.register.get("telefono")?.value;
        this.usuario.Password = this.register.get("password")?.value;

        await this.validarInformacion();

        if(this.informacionValida){
          //enviamos post al servidor con el correo electronico del usuario
          this.registroServicio.enviarCodigo(this.usuario.Email).subscribe({
            next: respuesta=>{
              console.log(respuesta)
            },
            error: (error)=>{
              console.log(error)
            }
          });
        }
      }
  }

  comprobarErrores(){

    //comprobamos que todo la la informacion suministrada sea correcta
    this.register.get("password")?.value!=this.register.get("confirPassword")?.value ? this.errorContrasena="las contraseñas no son iguales" : 
        this.register.get("password")?.invalid ? this.errorContrasena="Contraseña no valida" : this.errorContrasena="" 

    this.register.get("nombre")?.invalid ? this.errorNombre="Nombre muy corto" :  this.errorNombre="";
    this.register.get("email")?.invalid ?  this.errorEmail="Email invalido" : this.errorEmail="";
    this.register.get("telefono")?.invalid ? this.errorNumero="Numero telefonico invalido" : this.errorNumero="";

    return this.register.valid && this.register.get("password")?.value==this.register.get("confirPassword")?.value;
  }

  async validarInformacion(){

    let respuesta = await firstValueFrom(this.registroServicio.ValidarInformacion(this.usuario));

    this.camposValidos.nombreValido = !respuesta.nombre;
    this.camposValidos.emailValido = !respuesta.email;
    this.camposValidos.numeroValido = !respuesta.numero;

    this.comprobarInformacionServidor();
 
  }

  private comprobarInformacionServidor(){
    //si es valido va al comprobante del codigo
    this.informacionValida=true

    //validar email
    if(!this.camposValidos.emailValido){
      this.errorEmail = "El correo electronico ya existe";
      this.informacionValida=false; 
    }else
      this.errorEmail =""

    //validar numero
    if(!this.camposValidos.nombreValido){
      this.errorNombre = "El nombre ya existe"
      this.informacionValida=false;
    }else
      this.errorNombre =""

    //validar numero
    if(!this.camposValidos.numeroValido){
      this.errorNumero = "El numero ya existe";
      this.informacionValida=false;
    }else
      this.errorNumero =""

  }
  
  validarCodigo(){

    if(!isNaN(Number.parseInt(this.formCodigo.get('codigo')?.value))){
      this.usuario.codigo = Number.parseInt(this.formCodigo.get('codigo')?.value);
    }else{
      this.usuario.codigo = 0
    }
   
    this.registroServicio.RegistrarUsuario(this.usuario).subscribe({
      next: (respuesta)=>{
        this.codigoValido=respuesta;
      },
      error: (error)=>{
        this.errorCodigo=error.error;
      }
    });
  }

  routerInicioSesion(){
    this.router.navigate(['auth/login'])
  }

  public usuario={
    Name:"",
    Email:"",
    Telefono:"",
    Password:"",
    codigo:0
  }

  //registro de formularios
  public register:FormGroup;
  public formCodigo:FormGroup;
  //codigo de validacion
  public codigo = 0;
  
  //condicionales
  public informacionValida = false;
  public codigoValido = false;

  //validar que no haya informacion repetida
  public camposValidos = {
    nombreValido: false,
    emailValido: false,
    numeroValido: false
  }
  //errores del codigo
  public errorCodigo = "";
  public errorNombre = "";
  public errorEmail = "";
  public errorNumero = "";
  public errorContrasena="";
  

}
