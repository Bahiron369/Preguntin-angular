import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { inject, NgModule } from '@angular/core';
import { ApolloClientOptions, ApolloLink, InMemoryCache } from '@apollo/client/core';
import {setContext}  from '@apollo/client/link/context';

export function createApollo(): ApolloClientOptions<any> {
  const uri = 'http://localhost:5075/graphql/'; 
  const httpLink = inject(HttpLink);

  const authLink= setContext(()=>{
    let token = localStorage.getItem('token');
    return {
      headers: {
          Authorization: token ? `Bearer ${token}` : ''
      }
    }
  });
  return {
    link: ApolloLink.from([authLink,httpLink.create({uri})]),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  providers: [provideApollo(createApollo)],
})
export class GraphQLModule {}
