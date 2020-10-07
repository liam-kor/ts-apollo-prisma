import { rule, shield } from 'graphql-shield';
import { Context } from '../../context';
import { verify } from 'jsonwebtoken';
import { getUserId } from '../utils';

export const APP_SECRET = 'lunasoft';

interface Token {
  userId: string;
}

const rules = {
  isAuthenticatedUser: rule()((parent, args, context) => {
    const userId = getUserId(context);
    if (userId) {
        return true
    } else {
        return false
    }
  }),
//   isPostOwner: rule()(async (parent, { id }, context) => {
//     const userId = getUserId(context);
//     const author = await context.prisma.post
//       .findOne({
//         where: {
//           id: Number(id),
//         },
//       })
//       .author();
//     return userId === author.id;
//   }),
};

export const permissions = shield({
  Query: {
    users: rules.isAuthenticatedUser,
    // filterPosts: rules.isAuthenticatedUser,
    // post: rules.isAuthenticatedUser,
  },
  Mutation: {
    // createDraft: rules.isAuthenticatedUser,
    // deletePost: rules.isPostOwner,
    // publish: rules.isPostOwner,
  },
});