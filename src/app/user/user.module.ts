import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../Auth/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { PreguntasComponent } from './questions/preguntas/preguntas.component';
import { ComodinesComponent } from './questions/comodines/comodines/comodines.component';
import { PuntajeGlobalCategoriaComponent } from './questions/punta_global_categoria/puntaje-global-categoria/puntaje-global-categoria.component';

const router: Routes = [
    {path:'dashboard',component:DashboardComponent, canActivate: [authGuard]},
    {path:'dashboard/preguntas/:categoria/:idCategoria', component:PreguntasComponent, canActivate: [authGuard]}
]

@NgModule({
  declarations: [
    DashboardComponent,
    PreguntasComponent,
    ComodinesComponent,
    PuntajeGlobalCategoriaComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(router),
    HttpClientModule
  ],
  exports: [
    RouterModule
  ]
})
export class UserModule { }
