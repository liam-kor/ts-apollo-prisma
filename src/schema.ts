// import { gql } from 'apollo-server-express'

// export const typeDefs = gql`
//   # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

//   # This "Book" type defines the queryable fields for every book in our data source.
//   type Book {
//     title: String
//     author: String
//   }

//   # The "Query" type is special: it lists all of the available queries that
//   # clients can execute, along with the return type for each. In this
//   # case, the "books" query returns an array of zero or more Books (defined above).
//   type Query {
//     books: [Book]
//   }
// `;
import { makeSchema } from '@nexus/schema'
import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema';
import { type } from 'os'
import { join } from 'path'
import * as models from './models'
import * as resolvers from './resolvers'

export const schema = makeSchema({
    types: {
        models,
        resolvers
    },
    plugins: [nexusSchemaPrisma()],
    outputs: {
        typegen: join(__dirname, '..', 'generated/nexus.ts'),
        schema: join(__dirname, '..', 'schema.graphql')
    },
    typegenAutoConfig: {
        sources: [
            {
                source: '@prisma/client',
                alias: 'client',
            },
            {
                source: require.resolve('./context'),
                alias: 'ContextModule',
            },
        ],
        contextType: 'ContextModule.Context'
    }
})