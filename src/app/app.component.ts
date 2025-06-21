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

    this.router.events.pipe(filter(e=>e instanceof NavigationEnd)).subscribe((event:NavigationEnd)=>{
        this.botones_autentificacion_activados = event.urlAfterRedirects == '/' ?  true : false;
    })

   
  }
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
 
  inicioSesion(estado:boolean):Observable<boolean>{
    let estadoBotones = new Observable<boolean>((observer)=>{
      observer.next(estado)
    });

    return estadoBotones;
  }

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
