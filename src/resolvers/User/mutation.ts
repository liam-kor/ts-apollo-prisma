import { inputObjectType, intArg, mutationField, stringArg } from '@nexus/schema';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getUserId } from '../../middlewares/utils'


export const signUp = mutationField('signUp', {
    type: 'User',
    nullable: false,
    args: {
        email: stringArg({ required: true }),
        password: stringArg({ required: true }),
        partner_id: intArg({ required: true })
    },
    resolve: async (_root, {email, password, partner_id}, ctx) => {
        const exists = await ctx.prisma.user.findMany({ where: { email: email }})
        if (exists.length > 0) {
            throw Error("중복되는 이메일 입니다.")
        }

        const cryptedPassword = await hash(password, 10)

        const user = {
            email: email,
            password: cryptedPassword,
            partner: {
                connect: { id: partner_id} 
            }
        }
        console.log(user)
        return ctx.prisma.user.create({
            data: user
        })
    }
})

export const signIn = mutationField('signIn', {
    type: 'AuthPayload',
    args: {
        email: stringArg({ nullable: false }),
        password: stringArg({ nullable: false })
    },
    resolve: async (_root, { email, password }, ctx) => {
        const user = await ctx.prisma.user.findOne({
            where: {
                email: email
            }
        })

        if (!user) {
            throw new Error('No User exists')
        }

        return {
            token: sign({ userId: user.id }, ctx.appSecret),
            user
        }
    }
})

export const UserUpdateInputType = inputObjectType({
    name: 'UserUpdateInput',
    definition(t) {
        t.string('email', {
            required: true,
        });
        t.string('nickname');
    }
})

export const updateUser = mutationField('updateUser', {
    type: 'User',
    args: {
        user: 'UserUpdateInput'
    },
    resolve: async (_root, { user }, ctx) => {
        const current_user = await ctx.prisma.user.findOne({where: { id: ctx.user_id}})
        if (!current_user) {
            throw new Error('No User exists')
        }
        console.log(current_user)
        const passwordValid = await compare(user.password, current_user.password)

        if (!passwordValid) {
            throw new Error('Invalid password')
        }

        return ctx.prisma.user.update({
            where: {
                id: ctx.user_id
            },
            data: user
        })
    }
})