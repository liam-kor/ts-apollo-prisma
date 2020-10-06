import { intArg, queryField, stringArg } from '@nexus/schema';

export const users = queryField('users', {
    nullable: true,
    type: 'User',
    list: true,
    resolve(_root, _args, ctx) {
        return ctx.prisma.user.findMany( { where: { } } )
    }
})