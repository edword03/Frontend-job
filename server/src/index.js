import express from 'express'
import typeDefs from './schema/index.js'
import { resolvers } from './resolvers/index.js'
import cors from 'cors'

import { ApolloServer } from 'apollo-server-express'
import { Vacancies } from './api/Vacancies.js'

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers,
    dataSources: () => {
      return {
        api: new Vacancies()
      }
    }
  });

  await server.start();

  const app = express();
  app.use(cors())

  server.applyMiddleware({ app });

  await new Promise(resolve => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  return { server, app };
};

const { app, server } = startServer();

