import { intArg, queryField, stringArg } from '@nexus/schema';

export const drafts = queryField('drafts', {
  nullable: false,
  type: 'Post',
  list: true,
  resolve(_root, _args, ctx) {
    // return ctx.db.posts.filter((p: any) => p.published === false)
    return ctx.prisma.post.findMany({ where: { published: false } });
  },
});
export const posts = queryField('posts', {
  type: 'Post',
  resolve(_root, _args, ctx) {
    // return ctx.db.posts.filter((p: any) => p.published === true)
    return ctx.prisma.post.findMany({ where: { published: true } });
  },
});
