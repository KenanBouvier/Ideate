import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const URI='http://192.168.1.66:4000/'

export const client = new ApolloClient({
  uri: URI,
  cache: new InMemoryCache(),
});

