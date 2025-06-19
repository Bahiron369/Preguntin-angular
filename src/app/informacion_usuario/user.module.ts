import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformacionUsuarioComponent } from './informacion-usuario/informacion-usuario.component';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../Auth/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routers:Routes = [
  {path:'informacion', component:InformacionUsuarioComponent, canActivate:[authGuard]},
]

@NgModule({
  declarations: [
    InformacionUsuarioComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routers),
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    InformacionUsuarioComponent
  ]
})
export class UserModule { }
