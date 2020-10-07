import { ApolloServer, gql } from 'apollo-server-express'
import { applyMiddleware } from 'graphql-middleware';
import express from 'express'
import depthLimit from 'graphql-depth-limit'
import compression from 'compression'
import cors from 'cors'
import { schema } from './schema'
import { permissions } from './middlewares/permissions'
import { createContext } from './context'

const schemaWithMiddleware = applyMiddleware(
    schema,
    permissions,
);

const server = new ApolloServer({
    schema: schemaWithMiddleware,
    context: createContext,
    // validationRules: [depthLimit(7)]
});

const app = express()
app.use('*', cors())
app.use(compression())
app.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});
server.applyMiddleware({ app, path: '/graphql' })

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);