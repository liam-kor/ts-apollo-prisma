import { rule, shield } from 'graphql-shield';

const rules = {
    isAuthenticatedUser: rule()((parent, args, context) => {
        if (context.user_id) {
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
        // createPartner: rules.isAuthenticatedUser,
        // createDraft: rules.isAuthenticatedUser,
        // deletePost: rules.isPostOwner,
        // publish: rules.isPostOwner,
    },  
}, {
    allowExternalErrors: true
});