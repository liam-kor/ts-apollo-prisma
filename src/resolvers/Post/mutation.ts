import { intArg, mutationField, stringArg } from '@nexus/schema';

export const createDraft = mutationField('createDraft', {
  type: 'Post',
  nullable: false,
  args: {
    title: stringArg({ required: true }),
    body: stringArg({ required: true }),
  },
  resolve: (_root, args, ctx) => {
    const draft = {
      // id: ctx.db.posts.length + 1,
      title: args.title,
      body: args.body,
      published: false,
    };
    // ctx.db.posts.push(draft)
    // return draft
    return ctx.prisma.post.create({ data: draft });
  },
});

export const publish = mutationField('publish', {
  type: 'Post',
  args: {
    draftId: intArg({ required: true }),
  },
  resolve(_root, args, ctx) {
    // let draftToPublish = ctx.db.posts.find((p: any) => p.id === args.draftId)

    // if (!draftToPublish) {
    //     throw new Error('Could not find draft with id ' + args.draftId)
    // }

    // draftToPublish.published = true

    // return draftToPublish
    return ctx.prisma.post.update({
      where: { id: args.draftId },
      data: {
        published: true,
      },
    });
  },
});
