import { intArg, queryField, stringArg } from '@nexus/schema';

export const permissions = queryField('permissions', {
  nullable: true,
  type: 'Permission',
  list: true,
  args: {
    code: stringArg({ required: false }),
    name: stringArg({ required: false }),
  },
  resolve(_root, _args, ctx) {
    return ctx.prisma.permission.findMany({
      where: { code: _args.code, name: _args.name },
    });
  },
});
