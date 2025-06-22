import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './Login/login.component';
import { RegisterComponent } from './Register/register.component';
import { ForgetPasswordComponent } from './login_forget/forget-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

//todas las url de la autentificacion
const routes: Routes = [
  {path:'auth/register', component:RegisterComponent},
  {path:'auth/login', component:LoginComponent},
  {path:'auth/login/forget', component:ForgetPasswordComponent},
];

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent
  ]
})
export class AuthModule { }
