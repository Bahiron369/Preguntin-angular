import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamePublicComponent } from './public/Game/Public/game-public/game-public.component';
import { RegisterComponent } from './Auth/Register/register.component';
import { LoginComponent } from './Auth/Login/login.component';
import { ForgetPasswordComponent } from './Auth/login_forget/forget-password.component';
import { DashboardComponent } from './Game/dashboard/dashboard/dashboard.component';
import { authGuard } from './Auth/auth.guard';
import { blockAuthGuard } from './Auth/block-auth.guard';
import { PreguntasComponent } from './Game/questions/preguntas/preguntas.component';
import { InformacionUsuarioComponent } from './informacion_usuario/informacion-usuario/informacion-usuario.component';
import { JuegoComponent } from './admin/juego/juego.component';
import { UsuariosComponent } from './admin/usuarios/usuarios.component';
import { adminGuard } from './Auth/admin.guard';
import { AgregarCategoriaComponent } from './admin/juego/agregar-categoria/agregar-categoria.component';
import { ModificarCategoryComponent } from './admin/juego/modificar-category/modificar-category.component';


const routes: Routes = [
  {path:'',component:GamePublicComponent, canActivate: [blockAuthGuard]},
  {path:'game/public', component:GamePublicComponent, canActivate: [blockAuthGuard] },
  {path:'auth/register', component:RegisterComponent, canActivate: [blockAuthGuard]},
  {path:'auth/login', component:LoginComponent, canActivate: [blockAuthGuard]},
  {path:'auth/login/forget', component:ForgetPasswordComponent, canActivate: [blockAuthGuard]},
  {path:'dashboard', component:DashboardComponent, canActivate: [authGuard]},
  {path:'dashboard/preguntas/:categoria/:idCategoria', component:PreguntasComponent, canActivate: [authGuard]},
  {path:'dashboard/informacion', component:InformacionUsuarioComponent, canActivate:[authGuard]},
  {path:'dashboard/admin/juego',component:JuegoComponent, canActivate:[adminGuard]},
  {path:'dashboard/admin/usuarios', component:UsuariosComponent, canActivate:[adminGuard]},
  {path:'dashboard/admin/juego/agregar-categoria', component:AgregarCategoriaComponent, canActivate:[adminGuard]},
  {path:'dashboard/admin/juego/modificar-category/:nombreCategoria/:idCategoria', component:ModificarCategoryComponent, canActivate:[adminGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
