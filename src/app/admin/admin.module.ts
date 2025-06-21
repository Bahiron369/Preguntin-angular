import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JuegoComponent } from './juego/juego.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { RouterModule, Routes } from '@angular/router';
import { adminGuard } from '../Auth/admin.guard';
import { AgregarCategoriaComponent } from './juego/agregar-categoria/agregar-categoria.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModificarCategoryComponent } from './juego/modificar-category/modificar-category.component';

const routes:Routes = [
  {path:'dashboard/admin/juego',component:JuegoComponent, canActivate:[adminGuard]},
  {path:'dashboard/admin/usuarios', component:UsuariosComponent, canActivate:[adminGuard]},
  {path:'dashboard/admin/juego/agregar-categoria', component:AgregarCategoriaComponent, canActivate:[adminGuard]},
  {path:'dashboard/admin/juego/modificar-category/:nombreCategoria/:idCategoria', component:ModificarCategoryComponent, canActivate:[adminGuard]}
]

@NgModule({
  declarations: [
    JuegoComponent,
    UsuariosComponent,
    AgregarCategoriaComponent,
    ModificarCategoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    JuegoComponent,
    UsuariosComponent
  ]
})
export class AdminModule { }
