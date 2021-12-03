import exrpess from 'express'
import { typeDefs } from './schema'
import {createServer} from 'http'
import { resolvers, getFetch } from './resolvers'
const { graphqlHTTP } = require('express-graphql');

const cors = require('cors')
const bodyParser = require('body-parser')
const urlUncode = bodyParser.urlencoded({ extended: false })
import { ApolloServer, gql } from 'apollo-server-express'


const startServer = async () => {
  const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers
  });

  await server.start();

  const app = exrpess();

  app.use(bodyParser.json())
  app.use(cors())

  app.post('/', urlUncode, (req, res) => {
    console.log(req.query);
    getFetch(req.body)
  })

  server.applyMiddleware({ app });

  await new Promise(resolve => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  return { server, app };
};

const { app, server } = startServer();

