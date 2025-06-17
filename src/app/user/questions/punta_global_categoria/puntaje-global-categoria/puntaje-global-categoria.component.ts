import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../../Auth/services/auth.service';
import { DashboardService } from '../../../dashboard/service/dashboard.service';

@Component({
  selector: 'app-puntaje-global-categoria',
  standalone: false,
  templateUrl: './puntaje-global-categoria.component.html',
  styleUrl: './puntaje-global-categoria.component.scss'
})
export class PuntajeGlobalCategoriaComponent implements OnInit {
  @Input() puntos!:number;
  @Input() idCategoria!:number;

  constructor(auth:AuthService,private categoria:DashboardService){

    let usuario = auth.getInforUsuario();
    this.nombreUsuario != null ? this.nombreUsuario = usuario['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] : null;
     
  }

  ngOnInit(): void {
    this.categoria.obtnerTopCategoria(this.idCategoria).subscribe({
      next:(data)=>{
        this.jugadores=data;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  MostrarJugadores(){
    if(this.jugadores.includes(this.nombreUsuario)){

    }
  }

  public jugadores:any;
  public nombreUsuario:string="";
}
