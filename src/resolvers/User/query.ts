import { intArg, queryField, stringArg } from '@nexus/schema';

export const users = queryField('users', {
  nullable: true,
  type: 'User',
  list: true,
  resolve(_root, _args, ctx) {
    return ctx.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        password: false,
        nickname: true,
        is_admin: true,
        partner: true,
        partner_id: true,
      },
      where: {
        partner_id: ctx.user.partner_id,
      },
    });
  },
});
