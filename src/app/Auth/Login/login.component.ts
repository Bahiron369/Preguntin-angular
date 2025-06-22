import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './service Login/login.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {

  constructor(private formBuilder:FormBuilder, private router:Router, private login:LoginService){
    //formulario reactivo para el login con campos de email y contraseña
    this.formLogin = formBuilder.group({
        Email:['',[Validators.required,Validators.email,Validators.pattern(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}/)]],
        Password:['',Validators.required],
    });

  }

  //1. se valida que la informacion suministrada sea valida para el envio de los datos 
  ValidarInformacion(){
    this.formLogin.get('Password')?.value =="" ? this.error_password ="Ingrese una contraseña" : this.error_password="";
    !this.formLogin.get('Email')?.valid ? this.error_email="Email invalido": this.error_email="";
    
    if(!this.formLogin.invalid&&this.formLogin.get('Email')?.valid){
      this.email = this.formLogin.get('Email')?.value;
      this.password = this.formLogin.get('Password')?.value;
      
      return true;
    }

    return false;
  }

  //2. despues de validar la informacion, se envian al servidor para procesar la solicitud
  EnviarInf(){
    if(this.ValidarInformacion()){
        this.login.enviarDatos(this.email,this.password).subscribe({
          //si es correcto enviamos guardamos el token
          next: (data)=>{
            localStorage.setItem('token',data.token);
            this.router.navigate(['dashboard'])
          },
          error: (errors)=>{
            //procesa los errores provinientes del servidor
            errors.error=='Contraseña incorrecta' ? this.error_password = 'Contraseña incorrecta' : this.error_password=""
            errors.error=='Correo electronico no registrado' ? this.error_email ='Correo electronico no registrado' : this.error_email=''
          }
        })
    }
  }

  //si no tiene cuenta tiene una opcion para redirigirse al registro
  RouterRegistro(){
    this.router.navigate(['auth/register'])
  }

  public formLogin:FormGroup;
  public email:string =  "";
  public password:string = "";

  public error_email:string="";
  public error_password:string="";

}
