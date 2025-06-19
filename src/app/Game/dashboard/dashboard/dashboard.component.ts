import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../service/dashboard.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  public constructor(private categoriaServicio:DashboardService, private router:Router){}

  ngOnInit(): void {
    this.categoriaServicio.obtenerCategoria().subscribe({
      next: (data)=>{
        this.categorias=data;
        this.puntosTotales = data.map((p:any)=>p.puntosCategoria);
        this.puntosTotales = this.puntosTotales.reduce((acumulador:any,valorTotal:any)=>acumulador+valorTotal,0);

        //enviamos los puntos totales del jugador
        this.categoriaServicio.setPuntosJugador(this.puntosTotales).subscribe({
          next:(mensaje)=>{
            console.log(mensaje);
          },
          error:(errors)=>{
            console.log(errors.error);
          }
        })

      },
      error:(errors)=>{
        console.log(errors.error)
      }
    })
  }

  routerPreguntas(nombreCategoria:string,idCategoria:number){
    this.router.navigate([`dashboard/preguntas`,nombreCategoria,idCategoria]);
  }

  public categorias:any;
  public puntosTotales:any;
}
