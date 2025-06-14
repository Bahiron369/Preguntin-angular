import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../Auth/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { PreguntasComponent } from './questions/preguntas/preguntas.component';

const router: Routes = [
    {path:'dashboard',component:DashboardComponent, canActivate: [authGuard]},
    {path:'dashboard/preguntas/:categoria', component:PreguntasComponent, canActivate: [authGuard]}
]

@NgModule({
  declarations: [
    DashboardComponent,
    PreguntasComponent
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
