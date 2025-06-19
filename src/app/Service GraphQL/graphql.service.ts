import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {

  constructor(private apollo:Apollo) { }

  //enviar correo para recuperar contraseña
  enviarCorreo(email:string){
    return this.apollo.mutate({
      mutation:gql
      `mutation enviarEmail($email:String!){
        validEmailForget(inputUpdatePassword:{
          email:$email
        })
      }`,
      variables:{
        email
      }
    });
  }

  actualizarInformacionUsuario(usuario:any){
    
    let nombre:string = usuario["nombre"];
    let email:string = usuario["email"];
    let telefono:string = usuario["numero"];

    return this.apollo.mutate({
      mutation:gql`
      mutation informacionJugador($email:String,$nombre:String,$telefono:String){
          updateJugador(inputJugador:  {
              nombre: $nombre,
              email: $email,
              telefono: $telefono
          }){
            token
            mensajes
            valido
          }
        }`,
      variables:{
        nombre,
        email,
        telefono
      }
    });

  }
 actualizarContrasenaUsuario(contrasenaActual:string,contrasenaNueva:string){
    
    return this.apollo.mutate({
      mutation:gql`
      mutation informacionJugador($contrasenaActual:String!,$contrasenaNueva:String!){
          updateJugador(inputJugador:  {
              oldPassword: $contrasenaActual,
              newPassword: $contrasenaNueva,
          }){
            mensajes
            valido
          }
        }`,
      variables:{
        contrasenaActual,
        contrasenaNueva
      }
    });
  }

  queryInformacionUsuario(){
    return gql `query{
                  queryInfUser{
                  id
                  email
                  telefono
                  name
                  }
                }`
  }
  
  actualizarCorreo(id:String,nuevoEmail:string,token:string){
    return this.apollo.mutate({
      mutation:gql `
      mutation cambioEmail($id:String!,$token:String!,$nuevoEmail:String!){
        validEmail(validEmail:  {
          id: $id,
          tokenEmail: $token,
          newEmail: $nuevoEmail
        })
      }
      `,
      variables:{
        id,
        nuevoEmail,
        token
      }
    });
  }

  actualizarNuevaContrasena(password:string, email:string, token:string){
    return this.apollo.mutate(
      {
        mutation: gql`
        mutation contrasenaForget($email:String!,$password:String!, $token:String!){
           updatePasswordForget(inputUpdatePassword:  {
              email: $email,
              password: $password,
              token: $token
          })
        }`,
        
        variables: {
          email,
          password,
          token
        }
      }
    );
  }
}
