import express from 'express'
import typeDefs from './src/schema/index.js'
import path from 'path'
import { resolvers } from './src/resolvers/index.js'
import cors from 'cors'

import { ApolloServer } from 'apollo-server-express'
import { Vacancies } from './src/api/Vacancies.js'

const PORT = process.env.PORT || 5000

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

  const buildPath = path.join(import.meta.url, '..', 'client/build')

  app.use(cors())
  app.use(express.static(buildPath))

  server.applyMiddleware({ app });

  await new Promise(resolve => app.listen({ port: PORT }, resolve));
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  return { server, app };
};

const { app, server } = startServer();

