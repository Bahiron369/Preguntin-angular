import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from './Auth/services/auth.service';
import { filter, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent{
  
  constructor(private router:Router,private authUsuario:AuthService){

    //este metodo sirve para ocultar los botones del inicio de sesion del navegador
    this.router.events.pipe(filter(e=>e instanceof NavigationEnd)).subscribe((event:NavigationEnd)=>{
        this.botones_autentificacion_activados = event.urlAfterRedirects == '/' ?  true : false;
    })

   
  }

  //redirige a la url al inicio
  RedirigirAuht(url:string){
    //si vamos a la pagina de inicio los botones se activan de lo contrario no
    let redirigirInicio = url=='/' ? true : false;
    this.inicioSesion(redirigirInicio).subscribe({
      next: (data)=>{
        this.botones_autentificacion_activados = data
      },
      error: (errors)=>{
        console.log(errors.error)
      }
    });
    this.router.navigate(['auth/'+url]);
  }
 
  //si esta el inicio de sesion cambia los botones
  inicioSesion(estado:boolean):Observable<boolean>{
    let estadoBotones = new Observable<boolean>((observer)=>{
      observer.next(estado)
    });

    return estadoBotones;
  }

  //verifica constantemente el estado del usario y sus roles
  EstadoUsurio(){
      this.authUsuario.UsuarioAutenticado().subscribe({
      next: (data)=>{
        this.usuarioRegistrado = data;
        let usuario = this.authUsuario.getInforUsuario();
        usuario != null ? this.nombreUsuario = usuario['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] : null;
        usuario != null ? this.Admin = this.authUsuario.IsAdmin() : '';

      },
      error: (errors)=>{
        console.log(errors.error)
      }
    });
  }

  //metodo para cerrar sesion y enviar al inicio 
  cerrarSesion(){
    this.authUsuario.cerraSesion();
    this.inicioSesion(true).subscribe({
      next: (data)=>{
        this.botones_autentificacion_activados = data
        this.toggerMenu=false;
      },
      error: (errors)=>{
        console.log(errors.error)
      }
    });
  }

  //activa y desactiva el menu desplegable
  menuDesplegado(){
    this.toggerMenu = !this.toggerMenu;
  }

  //navega a una url espesifica
  navegar(url:string){
    this.router.navigate([url]);
  }
  usuarioRegistrado:boolean=false;
  title = 'Preguntin';
  //cuando hagan click en los botones de iniciar sesion o registrase que los botones se oculten
  public botones_autentificacion_activados:boolean = true;
  public nombreUsuario:string="";
  public Admin:boolean=false;
  public toggerMenu:boolean = false;
}
