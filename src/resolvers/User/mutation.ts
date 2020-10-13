import {
  inputObjectType,
  intArg,
  mutationField,
  stringArg,
} from '@nexus/schema';
import { DuplicatedEmail, InvalidPassword, NoUserExists } from '../../errors';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

export const createUser = mutationField('createUser', {
  type: 'User',
  nullable: false,
  args: {
    email: stringArg({ required: true }),
    password: stringArg({ required: true }),
  },
  resolve: async (_root, { email, password }, ctx) => {
    const exists = await ctx.prisma.user.findMany({ where: { email: email } });
    if (exists.length > 0) {
      throw new DuplicatedEmail();
    }

    const cryptedPassword = await hash(password, 10);

    const user = {
      email: email,
      password: cryptedPassword,
      partner: {
        connect: { id: ctx.user.partner_id },
      },
    };

    return ctx.prisma.user.create({
      data: user,
    });
  },
});

export const signIn = mutationField('signIn', {
  type: 'AuthPayload',
  args: {
    email: stringArg({ nullable: false }),
    password: stringArg({ nullable: false }),
  },
  resolve: async (_root, { email, password }, ctx) => {
    const user = await ctx.prisma.user.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new NoUserExists();
    }

    const passwordValid = await compare(password, user.password);
    if (!passwordValid) {
      throw new InvalidPassword();
    }

    return {
      token: sign({ userId: user.id }, ctx.appSecret),
      user,
    };
  },
});

export const UserUpdateInputType = inputObjectType({
  name: 'UserUpdateInput',
  definition(t) {
    t.string('email', {
      required: true,
    });
    t.string('nickname');
  },
});

export const updateUser = mutationField('updateUser', {
  type: 'User',
  args: {
    user: 'UserUpdateInput',
  },
  resolve: async (_root, { user }, ctx) => {
    const current_user = await ctx.prisma.user.findOne({
      where: { id: ctx.user.id },
    });
    if (!current_user) {
      throw new NoUserExists();
    }

    return ctx.prisma.user.update({
      where: {
        id: ctx.user.id,
      },
      data: user,
    });
  },
});
