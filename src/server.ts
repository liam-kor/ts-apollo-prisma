import { ApolloServer, gql } from 'apollo-server-express'
import express from 'express'
import depthLimit from 'graphql-depth-limit'
import compression from 'compression'
import cors from 'cors'
import { schema } from './schema'
// import { db } from './db'
import { createContext } from './context'

const server = new ApolloServer({
    schema: schema,
    context: createContext
    // resolvers: resolvers,
    // validationRules: [depthLimit(7)]
});

const app = express()
app.use('*', cors())
app.use(compression())
server.applyMiddleware({ app, path: '/graphql' })

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);