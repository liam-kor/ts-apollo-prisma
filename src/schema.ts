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