import { intArg, mutationField, stringArg } from '@nexus/schema';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';


export const signUp = mutationField('signUp', {
    type: 'User',
    nullable: false,
    args: {
        email: stringArg({ required: true }),
        password: stringArg({ required: true }),
    },
    resolve: async (_root, {email, password}, ctx) => {
        const exists = await ctx.prisma.user.findMany({ where: { email: email }})
        if (exists.length > 0) {
            throw Error("중복되는 이메일 입니다.")
        }

        const cryptedPassword = await hash(password, 10)

        const user = {
            email: email,
            password: cryptedPassword
        }
        console.log(user)
        return ctx.prisma.user.create( {data: user} )
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

        const passwordValid = await compare(password, user.password)

        if (!passwordValid) {
            throw new Error('Invalid password')
        }
        
        return {
            token: sign({ userId: user.id }, 'lunasoft'),
            user
        }
    }
})
