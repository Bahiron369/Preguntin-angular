import { Injectable } from '@angular/core';
import { Apollo, gql, Mutation } from 'apollo-angular';

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
