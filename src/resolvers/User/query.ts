import { intArg, queryField, stringArg } from '@nexus/schema';

// type User = {
//   id: number;
//   email?: string;
//   password?: string;
//   nickname?: string;
//   partner_id: number;
//   created_at?: any;
//   updated_at?: any;
//   is_admin?: number;
// };

export const users = queryField('users', {
  nullable: true,
  type: 'User',
  args: {
    max_view_cnt: intArg({ required: false }),
    page_no: intArg({ required: false }),
  },
  list: true,
  resolve: (_root, _args, ctx) => {
    return ctx.prisma.user.findMany({
      skip: _args.page_no ? _args.max_view_cnt * (_args.page_no - 1) : 0,
      take: _args.max_view_cnt ? _args.max_view_cnt : undefined,
      where: {
        partner_id: ctx.user.partner_id,
      },
    });
  },
});
