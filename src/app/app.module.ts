import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { GraphQLModule } from './graphql.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './Auth/auth.module';
import { GameModule } from './Game/game.module';
import { GamePublicComponent } from './public/Game/Public/game-public/game-public.component';
import { HttpClientModule } from '@angular/common/http';
import { UserModule } from './informacion_usuario/user.module';

@NgModule({
  declarations: [
    AppComponent,
    GamePublicComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    GraphQLModule,
    AdminModule,
    AuthModule,
    GameModule,
    UserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
