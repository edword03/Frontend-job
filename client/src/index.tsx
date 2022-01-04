import React from 'react';
import ReactDOM from 'react-dom';
import { App } from '@components/App';
import { ApolloClient, gql, ApolloProvider } from '@apollo/client';
import { cache } from './cache';

export const typeDefs = gql`
  type VacancyItem {
    title: String
    description: String
  }

  extend type Query {
    isVisible: Boolean!
    vacancyId: ID!
    currentVacancy: VacancyItem
  }
`;


const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URL,
  cache,
  typeDefs
});


ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root'),
);
