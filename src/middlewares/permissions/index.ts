import { rule, shield, and, or, not } from 'graphql-shield';

const rules = {
    isAuthenticatedUser: rule()((parent, args, context) => {
        if (context.user) {
            return true
        } else {
            return false
        }
    }),
    isAdminUser: rule()((parent, args, context) => {
        if (context.user.is_admin) {
            return true
        } else {
            return false
        }
    })
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
    },
    Mutation: {
        createUser: and(rules.isAuthenticatedUser, rules.isAdminUser),
    },  
}, {
    allowExternalErrors: true
});