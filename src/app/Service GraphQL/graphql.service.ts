import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})

//GrahpQl es una tecnologia que agrega query y mutaciones a las API, basicamente son consultas para API
//son flexibles, no depende de una unica estructuras y funcionan con un solo ENDPOINT
//las query son consultas que se envian al servidor y este da una respuesta, como en una base de datos (get en API)
//las mutationes sirven para alteral la informacion que se le envia a un servidor (POST, DELETE Y PUT)
//se usa GrahpQl para realizar consultas y modificaciones sin necesidad de depender de una estructuracion en las peticiones
//y mantiene la flexibilidad, evitando llamadas a diferentes end points 

export class GraphqlService {

  constructor(private apollo:Apollo) { }

  //mutacion para enviar correo para recuperar contraseña
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

  //acualiza el nombre, email y numero del usario
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

  //envia el cambio de contraseña del usario 
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

  //query para obtner informacion usario (Administrador)
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
  
  //actualiza el correo enviendo el token de confirmacion, nuevo correo y el id
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

  //actualiza la contraseña
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
