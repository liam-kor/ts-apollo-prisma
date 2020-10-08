import { intArg, queryField, stringArg } from '@nexus/schema';

export const partners = queryField('partners', {
  nullable: true,
  type: 'Partner',
  list: true,
  resolve(_root, _args, ctx) {
    return ctx.prisma.partner.findMany({ include: { users: true } });
  },
});
