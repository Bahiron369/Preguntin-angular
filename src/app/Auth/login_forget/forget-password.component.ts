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

    this.formEmail = this.fb.group({
      email: ['',[Validators.email,Validators.required,Validators.pattern(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}/)]]
    })

    this.formPasswordForget  = this.fb.group({
      newPassword: ['',[Validators.required,Validators.minLength(8),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[*+-.#@%&$!]).{8,}$/)]],
      confirmPassword: ['',[Validators.required]]
    });
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(param=>{
      this.send = param.get('send');
      this.token = param.get('token');
      this.email = param.get('email');
    });
  }

  enviarEmail(){

    this.formEmail.get("email")?.invalid ?  this.errorEmail="Email invalido" : this.errorEmail="";

    this.grphql.enviarCorreo(this.formEmail.get('email')?.value).subscribe({
      next: (response)=>{
        this.email=this.formEmail.get('email')?.value;
        this.mensajeEnviado=true;

      },
      error: (errors)=>{
        this.errorEmail=errors.error;
        console.log(errors)
        this.mensajeEnviado=false;
      }
    })
  }

  cambiarcontrasena(){

    this.formPasswordForget.get("newPassword")?.value!=this.formPasswordForget.get("confirmPassword")?.value ? this.errorPassword="las contraseñas no son iguales" : 
        this.formPasswordForget.get("newPassword")?.invalid ? this.errorPassword="Contraseña no valida" : this.errorPassword=""
 
    if(!this.formPasswordForget.invalid){
        console.log(this.formEmail.get('newPassword')?.value, this.email, this.token);
        this.grphql.actualizarNuevaContrasena(this.formPasswordForget.get('newPassword')?.value, this.email, this.token).subscribe({
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

  formEmail:FormGroup;
  formPasswordForget:FormGroup;
  
  public email:any;
  public send:any;
  public token:any;
  public newPassword:string = "";

  public errorEmail:string="";
  public errorPassword:string="";

  public mensajeEnviado: boolean = false;
  public contrasenaCambiada:boolean = false;
}
