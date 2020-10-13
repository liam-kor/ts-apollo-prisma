import { intArg, queryField, stringArg } from '@nexus/schema';

export const users = queryField('users', {
  nullable: true,
  type: 'User',
  args: {
    max_view_cnt: intArg({ required: false }),
    page_no: intArg({ required: false }),
  },
  list: true,
  resolve(_root, _args, ctx) {
    return ctx.prisma.user.findMany({
      skip: _args.page_no ? _args.max_view_cnt * (_args.page_no - 1) : 0,
      take: _args.max_view_cnt ? _args.max_view_cnt : undefined,
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
