import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GraphqlService } from '../../Service GraphQL/graphql.service';

@Component({
  selector: 'app-forget-password',
  standalone: false,
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent implements OnInit{

  constructor(private route:ActivatedRoute, private fb:FormBuilder, private grphql:GraphqlService){

    //formulario para el envio del email, con validacion
    this.formEmail = this.fb.group({
      email: ['',[Validators.email,Validators.required,Validators.pattern(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}/)]]
    })

    //formulario para el reestablecimiento de la contraseña
    this.formPasswordForget  = this.fb.group({
      newPassword: ['',[Validators.required,Validators.minLength(8),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[*+-.#@%&$!]).{8,}$/)]],
      confirmPassword: ['',[Validators.required]]
    });
  }

  ngOnInit(): void {
    //obtenemos los datos que hay en la url y los guardamos en variables
    this.route.queryParamMap.subscribe(param=>{
      this.send = param.get('send');//envio
      this.token = param.get('token');//token
      this.email = param.get('email');//correo
    });
  }

  //envio de la informacion al servidor por medio de grahpQl (lenguaje de consulta para API)
  enviarEmail(){

    //comprobar informacion
    this.formEmail.get("email")?.invalid ?  this.errorEmail="Email invalido" : this.errorEmail="";

    //enviamos informacion a la END-POINT
    this.grphql.enviarCorreo(this.formEmail.get('email')?.value).subscribe({
      next: (response)=>{
        //envia el mensaje
        this.email=this.formEmail.get('email')?.value;
        this.mensajeEnviado=true;

      },
      error: (errors)=>{
        //muestra errores del proceso
        this.errorEmail=errors.error;
        console.log(errors)
        this.mensajeEnviado=false;
      }
    })
  }

  //una ves que se envia el email, el mensaje contiene toda la informacion, token, correo y la confirmacion del envio del mensaje
  cambiarcontrasena(){
    //combrobamos que la contraseña cumpla con los requerimientos basicos
    this.formPasswordForget.get("newPassword")?.value!=this.formPasswordForget.get("confirmPassword")?.value ? this.errorPassword="las contraseñas no son iguales" : 
        this.formPasswordForget.get("newPassword")?.invalid ? this.errorPassword="Contraseña no valida" : this.errorPassword=""
    
    //si la nueva contraseña es valida, se envia al servido para realizar el cambio
    if(!this.formPasswordForget.invalid){
        console.log(this.formEmail.get('newPassword')?.value, this.email, this.token);
        this.grphql.actualizarNuevaContrasena(this.formPasswordForget.get('newPassword')?.value, this.email, this.token).subscribe({
        //si fue exitoso devuelve true, de lo contrario devuelve false
        next: (data)=>{
          this.contrasenaCambiada=true;
        },
        error: (errors)=>{
          console.log(errors);
          this.contrasenaCambiada=false;
        }
     })
    }
  }

  //formularios
  formEmail:FormGroup;
  formPasswordForget:FormGroup;
  //datos de la url (que vienen en el correo al que se le envio la solicitud)
  public email:any;
  public send:any;
  public token:any;
  public newPassword:string = "";
  //variables de mensajes errores
  public errorEmail:string="";
  public errorPassword:string="";
  //controladores del flujo de ejecucion
  public mensajeEnviado: boolean = false;
  public contrasenaCambiada:boolean = false;
}
