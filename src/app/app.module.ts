import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { GraphQLModule } from './graphql.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './Auth/auth.module';
import { UserModule } from './user/user.module';
import { GamePublicComponent } from './public/Game/Public/game-public/game-public.component';
import { HttpClientModule } from '@angular/common/http';

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
    UserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
