const exrpess = require('express');
const { graphqlHTTP } = require('express-graphql');
// const Schema = require('./shema.graphql');
const { ApolloServer, gql } = require('apollo-server-express');
const fetch = require('node-fetch')

const resolvers = () => {
  const url = new URL('https://api.hh.ru/areas')

  const getFetch = async() => {
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      return data
    }

    throw new Error(response.status)
  }

  console.log(getFetch());

  return {
    Query: {
      getFetch
    }
  }
}

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs: gql`
      type City {
        name: String!
        id: ID
      }

      type Query {
        city: getFetch(): [City]
      }
    `,
    resolvers
  });

  await server.start();

  const app = exrpess();
  server.applyMiddleware({ app });

  await new Promise(resolve => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  return { server, app };
};

const { app, server } = startServer();

// const url = new URL('https://api.openweathermap.org/data/2.5/onecall');
// console.log(url);
// url.searchParams.append('lat', 55);
