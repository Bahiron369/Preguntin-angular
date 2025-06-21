import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PreguntasService } from '../../../Game/dashboard/service/preguntas.service';
import { JuegoAdminService } from '../services/juego-admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-category',
  standalone: false,
  templateUrl: './modificar-category.component.html',
  styleUrl: './modificar-category.component.scss'
})
export class ModificarCategoryComponent implements OnInit{

  constructor(private router:ActivatedRoute, private preguntasService:PreguntasService, private adminService:JuegoAdminService, private navegar:Router){
     
  }

  ngOnInit(): void {
     this.router.paramMap.subscribe((param)=>{
        this.idCategoria=param.get('idCategoria');
        this.nombreCategoria=param.get('nombreCategoria');
      })

      this.preguntasService.GetAllPreguntas(this.idCategoria,this.nombreCategoria).subscribe({
        next:(data)=>{
          this.preguntas=data;
          console.log(this.preguntas);
        },
        error:(err)=>console.log(err.error)
      })
  }

  eliminarPregunta(id:number){
    this.adminService.eliminarPregunta(id).subscribe({
        next:(data)=>{
          this.preguntas=data;
          console.log(this.preguntas);
        },
        error:(err)=>console.log(err.error)
      })

      Swal.fire('Eliminado','Las pregunta se elimino correctamente','success').then((result)=>{
        if(result.isConfirmed){
            window.location.reload();
        }
      })
  }

  eliminarTodasPreguntas(){
      Swal.fire({
        title:'Eliminar todas las preguntas',
        text:'¿Estas seguro de eliminar todas las preguntas de esta categoria?',
        icon:'error',
        confirmButtonText:'Si, estoy seguro',
        showCancelButton:true,
        cancelButtonText:'Cancelar'
      }).then((result)=>{
        if(result.isConfirmed){
            this.adminService.eliminarTodasPreguntas(this.idCategoria).subscribe({
                next:(data)=>{
                  Swal.fire('Eliminado','Los datos se eliminaron exitosamente','success').then((result)=>{
                    if(result.isConfirmed){
                        window.location.reload();
                    }
                  })
                },
                error:(err)=>{
                  console.log(err.error)
                  Swal.fire('Eliminado','Error al eliminar los datos','error').then((result)=>{
                    if(result.isConfirmed){
                        window.location.reload();
                    }
                  })
                }

                  
            })
        }
      } 
      );
  }

  routerCrearPregunta(){
    this.navegar.navigate(['dashboard/admin/juego/agregar-categoria']);
  }
  public idCategoria:any;
  public nombreCategoria:any;
  public preguntas:any;
}
