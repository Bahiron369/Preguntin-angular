import { Component } from '@angular/core';
import { JuegoAdminService } from '../juego/services/juego-admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  standalone: false,
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})

export class UsuariosComponent {

  constructor(private juego:JuegoAdminService){
    this.juego.GetUsuarios().subscribe({
      next:(data)=> this.usuarios=data,
      error:(err)=>console.log(err.error)
    });
  }

  eliminarUsuario(id:string){
    Swal.fire({
      icon:'warning',
      title:"Eliminar usuario",
      text:"¿Estas seguro que deseas eliminar a este usuario?",
      cancelButtonText:'Cancelar',
      showCancelButton:true,
      confirmButtonText:'Si, Estoy seguro'
    }).then(result=>{
      if(result.isConfirmed){
        this.juego.deleteUser(id).subscribe({
        next:()=>Swal.fire('Eliminado','El usuario se elimino correctamente','success'),
        error:(err)=>console.log(err.error)
        });
      }
    })
    
  }

  modificarRol(valor:boolean,usuario:any){
    this.activarModificarRol = valor;
    this.usuarioModificarRol = usuario;
    console.log(this.usuarioModificarRol)
  }

  guardarNuevoRolesUsuario(){
    if(this.rolesNuevos[0]!=""&& this.rolesNuevos!=null){
      if(this.rolesNuevos[0]=="ambos") this.rolesNuevos =["Admin","jugador"];
      this.juego.updateRoleUsuario(this.usuarioModificarRol.id,this.rolesNuevos).subscribe({
        next:()=> window.location.reload(),
        error:(err)=>console.log(err.error)
      });
      
    }else{
      this.errorAddRol="Agregar un rol para poder guardar";
    }
      
  }
  public activarModificarRol:boolean=false;
  public usuarioModificarRol:any;
  public rolesNuevos:any[]=[];
  public usuarios:any;
  public errorAddRol:string="";
}
