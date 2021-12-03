import React from 'react';
import ReactDOM from 'react-dom';
import { App } from '@components/App';
import { ApolloClient, gql, InMemoryCache, ApolloProvider, useQuery } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws'


// const link = new WebSocketLink({
//   uri: 'ws://localhost:4000/graphql',
//   options: {
//     reconnect: true
//   }
// })

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
})


client.query({
  query: gql` 
    query Job {
      getVacancies {
        items {
          name
        }
      }
    }
  `
}).then(result => console.log(result))

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root'),
);
