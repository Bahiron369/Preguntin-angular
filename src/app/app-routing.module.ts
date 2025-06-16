import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamePublicComponent } from './public/Game/Public/game-public/game-public.component';
import { RegisterComponent } from './Auth/Register/register.component';
import { LoginComponent } from './Auth/Login/login.component';
import { ForgetPasswordComponent } from './Auth/login_forget/forget-password.component';
import { DashboardComponent } from './user/dashboard/dashboard/dashboard.component';
import { authGuard } from './Auth/auth.guard';
import { blockAuthGuard } from './Auth/block-auth.guard';
import { PreguntasComponent } from './user/questions/preguntas/preguntas.component';


const routes: Routes = [
  {path:'',component:GamePublicComponent, canActivate: [blockAuthGuard]},
  {path:'game/public', component:GamePublicComponent, canActivate: [blockAuthGuard] },
  {path:'auth/register', component:RegisterComponent, canActivate: [blockAuthGuard]},
  {path:'auth/login', component:LoginComponent, canActivate: [blockAuthGuard]},
  {path:'auth/login/forget', component:ForgetPasswordComponent, canActivate: [blockAuthGuard]},
  {path:'dashboard', component:DashboardComponent, canActivate: [authGuard]},
  {path:'dashboard/preguntas/:categoria/:idCategoria', component:PreguntasComponent, canActivate: [authGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
