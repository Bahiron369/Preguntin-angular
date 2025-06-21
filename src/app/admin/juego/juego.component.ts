import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../Game/dashboard/service/dashboard.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { JuegoAdminService } from './services/juego-admin.service';

@Component({
  selector: 'app-juego',
  standalone: false,
  templateUrl: './juego.component.html',
  styleUrl: './juego.component.scss'
})
export class JuegoComponent implements OnInit {

  constructor(private categoriaService:DashboardService, private router:Router, private juego:JuegoAdminService){}

  ngOnInit(): void {
    this.categoriaService.obtenerCategoria().subscribe({
      next:(data)=>{
        this.categorias=data;
      },error:(err)=>{
        console.log(err.error)
      }
    });
  }

  routerAgregarCategoria(){
    this.router.navigate(['dashboard/admin/juego/agregar-categoria']);
  }

  routerModificarCategoria(categoria:any){
    this.router.navigate([`dashboard/admin/juego/modificar-category/${categoria.nombre}/${categoria.idCategoria}`]);
  }

  eliminarCategoria(id:number){
    Swal.fire({
      title:"Eliminar categoria",
      text:"¿Estas seguro de eliminar esta categoria?",
      icon:"warning",
      showCancelButton:true,
      confirmButtonText:"Si, estoy seguro",
      cancelButtonText:"No"
    }).then((result)=>{
      if(result.isConfirmed){
        this.juego.eliminarCategoria(id).subscribe({
          next: result => console.log(result),
          error:err=>console.log(err.error)
        })
        Swal.fire('Eliminado','La categoria fue eliminada.','success').then((result)=>{
            if(result.isConfirmed){
                window.location.reload();
            }
        })
        }
    })
  }

  public categorias:any;
}
